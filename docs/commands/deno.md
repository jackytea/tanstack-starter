## **Developing with Deno**

Development commands for [`deno`](https://www.npmjs.com/package/deno):
```bash
# install dependencies
deno install

# format all the code
deno task format

# type check the code
deno task validate

# initialize pre-commit
deno task prepare

# create drizzle migrations
deno run -A npm:drizzle-kit generate

# apply migrations to database
deno run -A npm:drizzle-kit migrate

# start app in dev mode
deno task dev

# build the app for prod
deno task build

# start app in prod mode
deno task start

# clear the pkg cache
deno clean
```

Utility commands for [`deno`](https://www.npmjs.com/package/deno):
```bash
# check for latest versions
deno outdated

# run editorconfig fixes on files
deno run -A npm:eclint fix .

# update major latest (alt: ncu -u)
deno run -A npm:npm-check-updates -u

# migrate biome configuration
deno run -A npm:@biomejs/biome migrate --write

# drizzle custom migration
deno run -A npm:drizzle-kit generate --custom

# detect circular dependencies
deno run -A npm:dpdm --no-warning --no-tree **/*.ts

# validate for react compiler compatibility
deno run -A npm:react-compiler-healthcheck@experimental
```

Generate an arbitrary secret value:
```bash
# generic secret generator
deno eval "console.log(btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32)))).replace(/[+\/=]/g, c => ({'+': '-', '/': '_', '=': ''}[c] || c)))"
```
