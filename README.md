[![codecov](https://codecov.io/github/Grimowsky/react-node-ts-monorepo/graph/badge.svg?token=fXoBYkKcbT)](https://codecov.io/github/Grimowsky/react-node-ts-monorepo)

# React & NodeJS Typescript monorepo boilerplate

React Node.js & Typescript JTW Authentication boilerplate.

## Tech Stack:

#### Frontend:

- Tailwind CSS
- Vite
- Vitest
- React Testing Library


#### Backend:

- Express
- Typescript
- Prisma ORM
- Jest for unit testing
- Docker
- Docker Compose
- PostgreSQL
- Zod
- Winston Logger








### Pre-configured backend features

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









### Environment Variables

To run this project, you will need to add the following environment variables to your .env file
note: postgresql on localhost has `POSTGRES_HOST_AUTH_METHOD=trust` flag, so no password locally is needed.

`DATABASE_URL=postgresql://postgres:@localhost:5432/postgres?schema=public&connect_timeout=3000`


### Workspaces

Preconfigured workspaces:
- server
- client

See package.json in root for the refference

### Run Locally

Clone the project

```bash
  git clone https://github.com/Grimowsky/react-node-ts-monorepo
```

Go to the project directory

```bash
  cd react-node-ts-monorepo
```

Install dependencies

```bash
  npm install
```

### Start the frontend and backend server & seed database:

Recommended way of starting locally is to use Docker Compose:

#### project root directory

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

### Running Tests

To run tests, run the following command

```bash
  npm run test
```

To run test with code coverage report, run the following command:

```bash
  npm run test:coverage
```

