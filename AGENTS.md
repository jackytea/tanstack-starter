# AGENTS.md

Tool agnostic context and working conventions for this repository. This is the
primary source of truth for any coding agent (Claude Code, Codex, Cursor,
etc.) working in this codebase. Read this before making changes.

## Overview

`tanstack-starter` is a full stack starter template built on
[TanStack Start](https://tanstack.com/start/latest). It bundles
authentication, a database layer, localization, UI components, and SSR out
of the box.

Core stack:

- [`@tanstack/react-start`](https://tanstack.com/start/latest) with
  [`@tanstack/react-router`](https://tanstack.com/router/latest) for routing
  and SSR
- [`react`](https://react.dev) 19
- [`drizzle-orm`](https://orm.drizzle.team) with PostgreSQL (`pg`)
- [`better-auth`](https://www.better-auth.com) for authentication
- [`@inlang/paraglide-js`](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)
  for i18n
- [`resend`](https://resend.com) for email
- [`tailwindcss`](https://tailwindcss.com) v4 with `shadcn/ui` style
  components
- [`nitro`](https://nitro.build) as the server runtime
- [`vite`](https://vite.dev) as the build tool

## Package manager

This project uses `pnpm` (see `packageManager` in `package.json` and
`pnpm-lock.yaml`). Prefer `pnpm` for all commands. `npm`, `bun`, and `deno`
equivalents exist in `docs/commands/` for contributors who need them, but
default to `pnpm` unless the user specifies otherwise.

## Commands

Run these from the repository root:

- `pnpm install` - install dependencies
- `pnpm dev` - start the dev server (`vite dev`)
- `pnpm build` - production build (`vite build`)
- `pnpm serve` - preview a production build (`vite preview`)
- `pnpm start` - run the built server (`node .output/server/index.mjs`)
- `pnpm migrate` - run database migrations (`drizzle-kit migrate`)
- `pnpm migrate:revert` - drop/revert migrations (`drizzle-kit drop`)
- `pnpm validate` - type check, lint, and format check
  (`tsc && oxlint && oxfmt --check .`)
- `pnpm fix` - auto fix unused exports, lint issues, and formatting
  (`pnpm knip && oxlint --fix . && oxfmt --write .`)
- `pnpm knip` - find and remove unused files, exports, and dependencies

There is no test runner configured in this repository. Do not invent a test
command; rely on `pnpm validate` to catch type and lint errors.

Before considering a change complete, run `pnpm validate`. A pre-commit hook
(`.husky/pre-commit`) already runs this on commit, so failures there block
the commit.

## Project structure

```
src/
  client.tsx        entry point for the client bundle
  server.ts         entry point for the server bundle
  router.tsx        TanStack Router setup
  start.tsx         TanStack Start setup
  routeTree.gen.ts   generated route tree, do not edit by hand
  routes/           file based routes, including src/routes/api for API routes
  typedefs/         shared *.d.ts declaration files
  lib/
    auth/           better-auth config, client, hooks, and utils
    components/     shared UI components, one PascalCase folder per component
    constants/      shared constants
    controllers/    request/business logic controllers
    database/       drizzle schemas, migrations, providers, and config
    email/          resend config and email utilities
    i18n/           paraglide config and translations (compiled/ is generated)
    layouts/        page layout components
    middleware/     TanStack Start middleware
    pages/          top level page components, one PascalCase folder per page
    services/       service layer, external integrations
    styles/         global CSS, Tailwind entry point
    types/          shared TypeScript types
    ui/             shadcn/ui style primitives
    utils/          shared utility functions
```

Generated or compiled directories should never be hand edited:
`routeTree.gen.ts`, `src/lib/i18n/compiled/`, `src/lib/i18n/config.inlang/`,
`.output/`.

## Path aliases

Import with the `@/` aliases defined in `tsconfig.json` rather than deep
relative paths:

- `@/*` -> `src/*`
- `@/auth/*` -> `src/lib/auth/*`
- `@/components/*` -> `src/lib/components/*`
- `@/constants/*` -> `src/lib/constants/*`
- `@/controllers/*` -> `src/lib/controllers/*`
- `@/database/*` -> `src/lib/database/*`
- `@/email/*` -> `src/lib/email/*`
- `@/i18n/*` -> `src/lib/i18n/*`
- `@/layouts/*` -> `src/lib/layouts/*`
- `@/middleware/*` -> `src/lib/middleware/*`
- `@/pages/*` -> `src/lib/pages/*`
- `@/services/*` -> `src/lib/services/*`
- `@/styles/*` -> `src/lib/styles/*`
- `@/types/*` -> `src/lib/types/*`
- `@/ui/*` -> `src/lib/ui/*`
- `@/utils/*` -> `src/lib/utils/*`
- `@/package` -> `package.json`

## Code conventions

- TypeScript strict mode is on. Do not weaken `tsconfig.json` settings to
  silence errors, fix the underlying type issue instead.
- Components and pages live in one PascalCase folder per component under
  `src/lib/components/` or `src/lib/pages/` (for example
  `src/lib/components/NavBar/NavBar.tsx`).
- Formatting and linting are enforced by `oxfmt` and `oxlint`
  (`oxfmt.config.ts`, `oxlint.config.ts`), not Prettier or ESLint. Let these
  tools format code, do not hand format against their rules.
- `jsx-a11y` rules are enforced as errors, keep markup accessible (alt text,
  labels, keyboard handlers, valid roles, etc).
- Tailwind classes are linted for canonical form, shorthand, and sort order.
  Let `oxlint --fix` or `pnpm fix` reorder classes rather than hand ordering
  them.
- `knip` enforces that files, exports, and dependencies stay used. If you add
  something intentionally unused for now, use the `lintignore` tag rather
  than leaving it to be flagged.

## Database

- Schemas live in `src/lib/database/schemas`, migrations in
  `src/lib/database/migrations`, generated and applied via `drizzle-kit`
  (`drizzle.config.ts`).
- After changing a schema, generate a migration with `drizzle-kit` and apply
  it with `pnpm migrate`. Do not hand edit generated migration SQL.
- A local Postgres instance is expected; `docker-compose.yaml` spins one up
  with `docker compose -f docker-compose.yaml up --build -d`.

## Environment variables

Configuration is read from `.env`. `.env.example` documents every variable
that is required. When adding a new environment variable, add it to
`.env.example` with a description, never commit real secrets.

## Commit conventions

Commit messages are linted by commitlint (`.commitlintrc.json`, enforced via
the `.husky/commit-msg` hook) using Conventional Commits with this allowed
type list: `feat`, `fix`, `docs`, `chore`, `style`, `refactor`, `ci`, `test`,
`revert`, `perf`.

Example: `fix(auth): correct redirect after session expiry`

## Localization

Translation source files live in `src/lib/i18n/translations`, compiled
output lives in `src/lib/i18n/compiled` and is generated by paraglide, do not
edit it directly. Regenerate it through the paraglide tooling instead of
editing compiled output.

## Pull requests

See `.github/CONTRIBUTING.md` for the contribution process. In short: discuss
non trivial changes before making them, update `README.md` when interfaces or
environment variables change, and follow SemVer for version bumps.
