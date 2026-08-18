import { spawnSync, type SpawnSyncOptions } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const packageJsonPath = path.join(repoRoot, 'package.json')

const SECTIONS = [
  'dependencies',
  'devDependencies',
  'optionalDependencies'
] as const

const run = (
  cmd: string,
  args: string[],
  options: Omit<SpawnSyncOptions, 'encoding'> = {}
) => {
  if (process.platform === 'win32') {
    return spawnSync([cmd, ...args].join(' '), [], {
      cwd: repoRoot,
      encoding: 'utf8',
      shell: true,
      ...options
    })
  }

  return spawnSync(cmd, args, { cwd: repoRoot, encoding: 'utf8', ...options })
}

const parseVersion = (
  version: string
): { parts: number[]; prerelease: string | null } => {
  const hyphenIndex = version.indexOf('-')
  const core = hyphenIndex === -1 ? version : version.slice(0, hyphenIndex)

  const prerelease = hyphenIndex === -1 ? null : version.slice(hyphenIndex + 1)
  const parts = core.split('.').map((part) => Number.parseInt(part, 10) || 0)

  return { parts, prerelease }
}

const compareVersions = (a: string, b: string): number => {
  const pa = parseVersion(a)
  const pb = parseVersion(b)

  const len = Math.max(pa.parts.length, pb.parts.length)
  const diff = Array.from(
    { length: len },
    (_, i) => (pa.parts[i] ?? 0) - (pb.parts[i] ?? 0)
  ).find((value) => value !== 0)

  if (diff !== undefined) {
    return diff
  }

  if (pa.prerelease === pb.prerelease) {
    return 0
  }

  if (pa.prerelease === null) {
    return 1
  }

  if (pb.prerelease === null) {
    return -1
  }

  return pa.prerelease < pb.prerelease ? -1 : 1
}

const stripRangePrefix = (range: string): string => {
  const match = /^[\^~]?(.+)$/.exec(range.trim())

  return match ? match[1] : range
}

const registryPathFor = (name: string): string => {
  return name.startsWith('@') ? name.replaceAll('/', '%2f') : name
}

const fetchVersions = async (name: string): Promise<string[]> => {
  const response = await fetch(
    `https://registry.npmjs.org/${registryPathFor(name)}`
  )

  if (!response.ok) {
    throw new Error(`registry returned ${response.status}`)
  }

  const meta = (await response.json()) as { versions?: Record<string, unknown> }

  return Object.keys(meta.versions ?? {})
}

const collectTargets = (packageJson: {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  optionalDependencies?: Record<string, string>
}): { name: string; range: string }[] => {
  const targets: { name: string; range: string }[] = []

  for (const section of SECTIONS) {
    const deps = packageJson[section]

    if (!deps) {
      continue
    }

    for (const [name, range] of Object.entries(deps)) {
      targets.push({ name, range })
    }
  }

  return targets
}

const main = async (): Promise<void> => {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as {
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
    optionalDependencies?: Record<string, string>
  }
  const targets = collectTargets(packageJson)

  for (const { name, range } of targets) {
    const currentVersion = stripRangePrefix(range)
    const versions = await fetchVersions(name).catch(() => null)

    if (!versions) {
      continue
    }

    const currentIsPrerelease = currentVersion.includes('-')
    const candidates = versions
      .filter((v) => currentIsPrerelease || !v.includes('-'))
      .filter((v) => compareVersions(v, currentVersion) > 0)
      .sort((a, b) => compareVersions(b, a))

    for (const candidate of candidates) {
      const result = run('pnpm', ['add', `${name}@${candidate}`])

      if (result.status === 0) {
        break
      }

      const output = `${result.stdout ?? ''}${result.stderr ?? ''}`

      if (!output.includes('ERR_PNPM_TRUST_DOWNGRADE')) {
        break
      }
    }
  }
}

main().catch(() => {
  process.exitCode = 1
})
