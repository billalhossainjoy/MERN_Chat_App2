# Development stage
FROM node:20.18.0-alpine AS development

WORKDIR /app

ENV NODE_ENV=development

COPY package*.json .

RUN npm ci --only=development

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "dev" ]

# build stage
FROM node:20.18.0-alpine AS build

WORKDIR /build

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

# Production stage
FROM build AS production

WORKDIR /app

COPY --from=build ./build/node_modules ./node_modules
COPY --from=build ./build/package*.json .
COPY --from=build ./build/dist ./dist

EXPOSE 4000

CMD [ "npm", "start" ]