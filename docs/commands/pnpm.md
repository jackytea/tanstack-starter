## **Developing with PNPM**

Development commands for [`pnpm`](https://www.npmjs.com/package/pnpm):

```bash
# install dependencies
pnpm install

# format all the code
pnpm format

# type check the code
pnpm validate

# initialize pre-commit
pnpm prepare

# create drizzle migrations
pnpm exec drizzle-kit generate

# apply migrations to database
pnpm exec drizzle-kit migrate

# start app in dev mode
pnpm dev

# build the app for prod
pnpm build

# start app in prod mode
pnpm start

# clear the pkg cache
pnpm store prune --force
```

Utility commands for [`pnpm`](https://www.npmjs.com/package/pnpm):

```bash
# verify all dependencies
pnpm audit

# update all dependencies
pnpm update

# check for latest versions
pnpm outdated

# check for unused dependencies
pnpm dlx depcheck

# approve prebuilts for pnpm
pnpm approve-builds

# run editorconfig fixes on files
pnpm dlx eclint fix .

# update major latest (alt: ncu -u)
pnpm dlx npm-check-updates -u

# install dependencies for modules
pnpm install --frozen-lockfile

# ignore arbitrary script executions
pnpm config set ignore-scripts true

# migrate biome configuration
pnpm dlx @biomejs/biome migrate --write

# drizzle custom migration
pnpm exec drizzle-kit generate --custom

# detect circular dependencies
pnpm dlx dpdm --no-warning --no-tree **/*.ts

# validate for react compiler compatibility
pnpm dlx react-compiler-healthcheck@experimental
```

Generate an arbitrary secret value:

```bash
# generic secret generator
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```
