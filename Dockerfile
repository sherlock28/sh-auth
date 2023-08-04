FROM node:18-alpine as dev
WORKDIR /usr
COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
COPY src ./src
RUN ls -a && npm ci
EXPOSE 4000
CMD ["npm","run","dev"]

FROM node:18-alpine as build
WORKDIR /usr
COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
COPY src ./src
RUN ls -a && npm ci && npm run build

FROM node:18-alpine as prod
WORKDIR /usr
COPY package.json ./
COPY .env ./
COPY src/keys ./keys
RUN npm install --only=production
COPY --from=build /usr/build .
RUN npm install pm2 -g
EXPOSE 4000
CMD ["pm2-runtime","index.js"]
