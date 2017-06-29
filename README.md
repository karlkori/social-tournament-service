# Social Tournament Service [![Build Status](https://travis-ci.org/karlkori/social-tournament-service.svg?branch=master)](https://travis-ci.org/karlkori/social-tournament-service)

Koa2, Typescript, PostgresDB, Sequelize, Docker, OpenAPI specification

## DEVELPMENT
### Prerequisites:

- Install `docker` & `docker-compose`

- Build image `docker-compose build`

- Run tests  `docker-compose -f docker-compose.test.yml up`

- Run service `docker-compose up`

- Open up http://127.0.0.1/developer.html - this is the API documentation

- `npm install`

- `sudo npm install ts-node -g`

- `sudo npm install typescript -g`

### Run locally

- `create nodemon.json (check format at nodemon.json.example) with your env params`

- `npm run dev-server`

### Build & compile project

- `npm run build`

### API documentation

We use OpenAPI specification [http://swagger.io/specification/] to describe and render documentation

To update the documentation please update public/swagger.yml file

### Migrations & seeding

- create an empty migration: `sequelize migration:create --name migration-name`

- rename the the extension of the migration file from .js to .ts

- add migration instruction to the file

- run migration: `npm run migrate`

To run sequelize commands localy, export correct variable DATABASE_URL

`DATABASE_URL=postgres://postgres:postgres@localhost:5432/tournament npm run migrate`

## Run tests

 - make sure you have a separate database for tests and you have ran migration against it to create schema, after that you can run tests

 - `DATABASE_URL=postgres://postgres:postgres@localhost:5432/tournament npm run test`

## Continuous Integration

Currently every changes in master branch will trigger Travis CI (https://travis-ci.org/karlkori/social-tournament-service) that will build new image and upload it to Docker Hub: https://hub.docker.com/r/sergiydagunov/social-tournament-service/

TODO: run test on Travis CI before upload new image version

## USAGE

- install docker & docker-compose

- clone project

- you can pull the latest image from Docker hub 
`docker pull sergiydagunov/social-tournament-service` 
otherwise the below command will build image locally before running service

- run `docker-compose up -d`

- open `http://127.0.0.1/developer.html` to see API documentation


## Some statements

- in some cases when the tournament prize cannot be divided with whole (without remaining) e.g. 100/3 = 33.3333 - in this case we round every part of prize to smaller number, 100/3 = 33.333 -> 33

- in some cases when the tournament deposit cannot be divided with whole (without remaining) e.g. 100/3 = 33.3333 - in this case we round every part of prize to bigger number, 100/3 = 33.333 -> 34

- it is not allowed to set tournament deposit or prize as real number, e.g. 1000.5

If some things is wrong - please provide more info and i will update the code.
