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
