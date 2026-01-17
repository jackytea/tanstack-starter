## **Developing with Bun**

Development commands for [`bun`](https://www.npmjs.com/package/bun):

```bash
# install dependencies
bun install

# format all the code
bun run format

# type check the code
bun run validate

# initialize pre-commit
bun run prepare

# create drizzle migrations
bunx drizzle-kit generate

# apply migrations to database
bunx drizzle-kit migrate

# start app in dev mode
bun run dev

# build the app for prod
bun run build

# start app in prod mode
bun run start

# clear the pkg cache
bun pm cache rm --force
```

Utility commands for [`bun`](https://www.npmjs.com/package/bun):

```bash
# verify all dependencies
bun audit

# update all dependencies
bun update

# check for latest versions
bun outdated

# check for unused dependencies
bunx depcheck

# run editorconfig fixes on files
bunx eclint fix .

# update major latest (alt: ncu -u)
bunx npm-check-updates -u

# install dependencies for modules
bun install --frozen-lockfile

# migrate biome configuration
bunx @biomejs/biome migrate --write

# drizzle custom migration
bunx drizzle-kit generate --custom

# detect circular dependencies
bunx dpdm --no-warning --no-tree **/*.ts

# validate for react compiler compatibility
bunx react-compiler-healthcheck@experimental
```

Generate an arbitrary secret value:

```bash
# generic secret generator
bun -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```
