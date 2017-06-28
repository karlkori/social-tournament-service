# Social Tournament Service [![Build Status](https://travis-ci.org/karlkori/social-tournament-service.svg?branch=master)](https://travis-ci.org/karlkori/social-tournament-service)

Koa2, Typescript, PostgresDB, Sequelize, Docker, OpenAPI specification

## Prerequisites:

- Install `docker` & `docker-compose`

- Build image `docker-compose build`

- Run tests  `docker-compose -f docker-compose.test.yml up`

- Run service `docker-compose up`

- Open up http://127.0.0.1/developer.html - this is an API documentation

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
