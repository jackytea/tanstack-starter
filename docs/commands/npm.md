## **Developing with NPM**

Development commands for [`npm`](https://www.npmjs.com/package/npm):

```bash
# install dependencies
npm install

# format all the code
npm run format

# type check the code
npm run validate

# initialize pre-commit
npm run prepare

# create drizzle migrations
npx drizzle-kit generate

# apply migrations to database
npx drizzle-kit migrate

# start app in dev mode
npm run dev

# build the app for prod
npm run build

# start app in prod mode
npm run start

# clear the pkg cache
npm cache clean --force
```

Utility commands for [`npm`](https://www.npmjs.com/package/npm):

```bash
# verify all dependencies
npm audit

# update all dependencies
npm update

# check for latest versions
npm outdated

# check for unused dependencies
npx depcheck

# run editorconfig fixes on files
npx eclint fix .

# update major latest (alt: ncu -u)
npx npm-check-updates -u

# install dependencies for modules
npm ci

# ignore arbitrary script executions
npm config set ignore-scripts true

# migrate biome configuration
npx @biomejs/biome migrate --write

# drizzle custom migration
npx drizzle-kit generate --custom

# detect circular dependencies
npx dpdm --no-warning --no-tree **/*.ts

# validate for react compiler compatibility
npx react-compiler-healthcheck@experimental
```

Generate an arbitrary secret value:

```bash
# generic secret generator
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```
