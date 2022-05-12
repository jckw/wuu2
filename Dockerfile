FROM node:16-bullseye-slim as base

WORKDIR /remix
ENV NODE_ENV production

# 1.1 Install node_modules for build
FROM base as build-deps

WORKDIR /remix
ADD package.json yarn.lock ./
RUN yarn install --production=false

# 1.2 Install node_modules for prod
FROM base as prod-deps

WORKDIR /remix
ADD package.json yarn.lock ./
RUN yarn install --production=true

# 2. Build the remix app
FROM base as build

WORKDIR /remix
COPY --from=build-deps /remix/node_modules /remix/node_modules
ADD . .
RUN yarn build

# 3. Final start step
FROM base

WORKDIR /remix
COPY --from=prod-deps /remix/node_modules /remix/node_modules
COPY --from=build /remix/public /remix/public
COPY --from=build /remix/build /remix/build

CMD ["./node_modules/.bin/remix-serve", "build"]
