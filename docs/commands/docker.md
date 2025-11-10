## **Running The Application With Docker**

Development commands for [`docker`](https://docker.com):

```bash
# build and run as daemonized process
docker compose -f docker-compose.yaml up --build -d
```

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

If you want to use [`npm`](https://www.npmjs.com/package/npm) in your [`Dockerfile`](../../Dockerfile), replace it with this:

```dockerfile
FROM node:25.1.0-alpine3.22

ARG APP_PORT

ARG APP_HOST

ARG NITRO_PORT

ENV APP_PORT=$APP_PORT

ENV APP_HOST=$APP_HOST

ENV NITRO_PORT=$NITRO_PORT

WORKDIR /app

COPY package*.json ./

RUN npm install -g patch-package && npm install

COPY . ./

RUN npm run build

EXPOSE $NITRO_PORT

CMD ["npm", "run", "start"]
```

**PNPM**

If you want to use [`pnpm`](https://www.npmjs.com/package/pnpm) in your [`Dockerfile`](../../Dockerfile), replace it with this:

```dockerfile
FROM node:25.1.0-alpine3.22

ARG APP_PORT

ARG APP_HOST

ARG NITRO_PORT

ENV APP_PORT=$APP_PORT

ENV APP_HOST=$APP_HOST

ENV NITRO_PORT=$NITRO_PORT

ENV SHELL=bash

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm && pnpm setup && pnpm install

COPY . ./

RUN pnpm build

EXPOSE $NITRO_PORT

CMD ["pnpm", "start"]
```

**Bun**

If you want to use [`bun`](https://www.npmjs.com/package/bun) in your [`Dockerfile`](../../Dockerfile), replace it with this:

```dockerfile
FROM oven/bun:1.3.1-alpine

ARG APP_PORT

ARG APP_HOST

ARG NITRO_PORT

ENV APP_PORT=$APP_PORT

ENV APP_HOST=$APP_HOST

ENV NITRO_PORT=$NITRO_PORT

ENV SHELL=bash

WORKDIR /app

COPY package*.json ./

RUN bun install

COPY . ./

RUN bun run build

EXPOSE $NITRO_PORT

CMD ["bun", "run", "start"]
```

**Deno**

If you want to use [`deno`](https://www.npmjs.com/package/deno) in your [`Dockerfile`](../../Dockerfile), replace it with this:

```dockerfile
FROM denoland/deno:alpine-2.5.6

ARG APP_PORT

ARG APP_HOST

ARG NITRO_PORT

ENV APP_PORT=$APP_PORT

ENV APP_HOST=$APP_HOST

ENV NITRO_PORT=$NITRO_PORT

ENV SHELL=bash

WORKDIR /app

COPY package*.json ./

RUN deno install

COPY . ./

RUN deno task build

EXPOSE $NITRO_PORT

CMD ["deno", "task", "start"]
```
