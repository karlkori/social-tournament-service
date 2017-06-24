# Social Tournament Service

Koa2, Typescript, PostgresDB, Sequelize, Docker, OpenAPI specification

## Prerequisites:

Install node.js

- `npm install`

- `sudo npm install ts-node -g`

- `sudo npm install typescript -g`

## Run locally

- `create nodemon.json with env params`

- `npm run dev-server`

## Build & compile project

- `npm run build`

## API documentation

We use OpenAPI specification [http://swagger.io/specification/] to describe and render documentation

To update the documentation please update public/swagger.yml file

## Migrations & seeding

- create an empty migration: `sequelize migration:create --name migration-name`

- rename the the extension of the migration file from .js to .ts

- add migration instruction to the file

- run migration: `npm run migrate`

To run sequelize commands localy, export correct variable DATABASE_URL

`DATABASE_URL=postgres://postgres:postgres@localhost:5432/tournament sequelize db:migrate`

Docker:

- Install `docker`

- `docker build -t social-tournament-service .`

- `docker run -e DATABASE_URL=postgres://postgres:postgres@localhost:5432/logs -e PORT=5000 -p 80:5000`

