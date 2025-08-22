FROM node:24-alpine as base

WORKDIR app/
COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

EXPOSE 8080

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["node"]

FROM base as dev
ENV NODE_ENV=development

RUN npm install -g nodemon && npm install
COPY . .

RUN ls -la




