## **Running The Application With Docker**

Development commands for [`docker`](https://docker.com):

```bash
# build and run as daemonized process
docker compose -f docker-compose.yaml up --build -d
```

A `.env` file must exist at the repository root before building it (copy it
from `.env.example` and fill in real values). The build stage mounts it as a
[BuildKit build secret](https://docs.docker.com/build/building/secrets/) to
read `VITE_*` variables at build time without baking `.env` into an image
layer, and the build fails if it's missing.

Utility commands for [`docker`](https://docker.com):

```bash
# quick start if no changes
docker compose up

# remove all containers
docker system prune --force --all

# remove all volumes
docker volume prune --force --all
```

## **Alternative Dockerfiles**

**NPM**

If you want to use [`npm`](https://www.npmjs.com/package/npm) in your
[`Dockerfile`](../../Dockerfile), replace it with this:

```dockerfile
# syntax=docker/dockerfile:1

#########################################
#               Base Image              #
#########################################
FROM node:alpine AS base

WORKDIR /app


#########################################
#            Install Packages           #
#########################################
FROM base AS deps

COPY package*.json ./
RUN npm install -g patch-package && npm install


#########################################
#           Build Application           #
#########################################
FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY . ./

RUN --mount=type=secret,id=dotenv,target=/app/.env,required=true \
    npm run build


#########################################
#             Runtime Image             #
#########################################
FROM node:alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/.output ./.output

CMD ["node", ".output/server/index.mjs"]
```

**PNPM**

This is the default approach already used by the root
[`Dockerfile`](../../Dockerfile) — no changes needed.

**Bun**

If you want to use [`bun`](https://www.npmjs.com/package/bun) in your
[`Dockerfile`](../../Dockerfile), replace it with this:

```dockerfile
# syntax=docker/dockerfile:1

#########################################
#               Base Image              #
#########################################
FROM oven/bun:alpine AS base

WORKDIR /app


#########################################
#            Install Packages           #
#########################################
FROM base AS deps

COPY package*.json ./
RUN bun install


#########################################
#           Build Application           #
#########################################
FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY . ./

RUN --mount=type=secret,id=dotenv,target=/app/.env,required=true \
    bun run build


#########################################
#             Runtime Image             #
#########################################
FROM node:alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/.output ./.output

CMD ["node", ".output/server/index.mjs"]
```

**Deno**

If you want to use [`deno`](https://www.npmjs.com/package/deno) in your
[`Dockerfile`](../../Dockerfile), replace it with this:

```dockerfile
# syntax=docker/dockerfile:1

#########################################
#               Base Image              #
#########################################
FROM denoland/deno:alpine AS base

WORKDIR /app


#########################################
#            Install Packages           #
#########################################
FROM base AS deps

COPY package*.json ./
RUN deno install


#########################################
#           Build Application           #
#########################################
FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY . ./

RUN --mount=type=secret,id=dotenv,target=/app/.env,required=true \
    deno task build


#########################################
#             Runtime Image             #
#########################################
FROM node:alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/.output ./.output

CMD ["node", ".output/server/index.mjs"]
```
