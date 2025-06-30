## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Migrations
В проект добавлена миграция для добавления 20 задач
```bash
# run migrations
$ yarn migration:run
gir
$ yarn migration:revert

# create empty migration
$ yarn migration:create MigrationName
```

##Docker
````bash
docker compose up --build
````