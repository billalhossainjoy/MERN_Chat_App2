# development stage
FROM node:20.18.0-alpine AS development

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]

# build stage
FROM node:20.18.0-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm ci

ARG VITE_REST_API

COPY . .

RUN npm run build

# production stage
FROM build AS production

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json .
COPY --from=build /app/dist /dist

EXPOSE 4173

CMD [ "npm", "run", "preview"]
