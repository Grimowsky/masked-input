
## Code analysis
[![codecov](https://codecov.io/github/Grimowsky/node-js-auth-example/graph/badge.svg?token=GCUGQUUEY6)](https://codecov.io/github/Grimowsky/node-js-auth-example)

# Node-JS & Typescript Auth Example

NodeJS & Typescript JTW Authentication boilerplate.

## Tech Stack:
- Express
- Typescript
- Prisma ORM
- Jest for unit testing
- Docker
- Docker Compose
- PostgreSQL
- Zod
- Winston Logger








## Features

- Registration flow:

  ``` /registration/register ```
- Authentication flow with refresh jwt token resource:

  ``` /auth/login ```

  ``` /auth/refresh-token ```
####  Middlewares

- Async middleware wrapper for controllers:

  ``` asyncWrapper.ts ```

- JWT middlewares:

  ```jwtMiddleware.ts ```

  ``` roleMiddleware.ts ```

- Request validate middleware built on top of Zod:

  ```  validateRequest.ts ```
#### Logger:
- Winston Logger:

  ``` config/logger ```









## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
note: postgresql on localhost has `POSTGRES_HOST_AUTH_METHOD=trust` flag, so no password locally is needed.

`DATABASE_URL=postgresql://postgres:@localhost:5432/postgres?schema=public&connect_timeout=3000`


## Run Locally

Clone the project

```bash
  git clone https://github.com/Grimowsky/node-js-auth-example
```

Go to the project directory

```bash
  cd node-js-auth-example
```

Install dependencies

```bash
  npm install
```

### Start the server & seed database:

Recommended way of starting locally is to use Docker Compose:

```bash
    docker compose up
```

#### Alternatively - with logs and force-rebuilding:

```bash
BUILDKIT_PROGRESS=plain docker compose up --build --force-recreate --renew-anon-volumes --remove-orphans
```

Please see ```package.json``` for other scripts and other ways of running locally

#### Seed database

Command (see package.json for refference) will migrate database schema and run seed.ts script from ```/prisma/seed.ts```

```bash
npm run prisma:populate
```

#### Note:
As docker-compose has no postgresql volumes attached, you will need to run ```prisma:populate``` script every time you kill docker compose process

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

To run test with code coverage report, run the following command:

```bash
  npm run test:coverage
```

