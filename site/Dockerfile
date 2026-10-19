FROM node:24.15.0-bookworm-slim AS build
WORKDIR /app
ENV DEPLOY_TARGET=railway
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
# Vinext is currently a devDependency and is also required by the Node server.
RUN npm ci --include=dev --no-audit --no-fund
COPY . .
RUN npm run build

FROM node:24.15.0-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV DEPLOY_TARGET=railway
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/package.json ./package.json
USER node
EXPOSE 3000
CMD ["node", "node_modules/vinext/dist/cli.js", "start", "--hostname", "0.0.0.0"]
