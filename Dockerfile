# docker build -t ceschiatti/guiga-stack:latest .
# docker run --rm -p 3000:3000 ceschiatti/guiga-stack

FROM oven/bun:latest AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN bun --frozen-lockfile install

FROM oven/bun:latest AS production-dependencies-env
COPY ./package.json bun.lock /app/
WORKDIR /app
RUN bun --frozen-lockfile --production install 

FROM oven/bun:latest AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN bun run build

FROM oven/bun:latest
RUN bun install -g cross-env
COPY ./package.json bun.lock server.ts /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["bun", "run", "start"]