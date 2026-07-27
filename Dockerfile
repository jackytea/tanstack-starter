# syntax=docker/dockerfile:1

############ Base Image ###########
FROM node:alpine AS base

ENV SHELL=bash
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g pnpm
WORKDIR /app


######### Install Packages ########
FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile


######## Build Application ########
FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY . ./

RUN --mount=type=secret,id=dotenv,target=/app/.env,required=true \
    pnpm build


########## Runtime Image ##########
FROM node:alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/.output ./.output

CMD ["node", ".output/server/index.mjs"]
