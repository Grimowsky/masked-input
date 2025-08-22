FROM node:18.16.1-alpine as base

WORKDIR app/
COPY package*.json ./
COPY tsconfig.json ./
EXPOSE 3000

FROM base as dev

RUN npm install
COPY . .


