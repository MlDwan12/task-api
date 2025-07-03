## Project setup

```bash
$ cd task-api && yarn install
$ cd ../task-worker/worker && yarn install
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
# Сборка и запуск всех сервисов
$ docker compose up --build -d

# Просмотр логов
$ docker compose logs -f api worker

# Остановка сервисов
$ docker compose down

# Полная очистка (включая volumes)
$ docker compose down -v
````

````bash
# Применение конфигураций
$ kubectl apply -f k8s/

# Проверка состояния
$ kubectl get pods -w

# Масштабирование worker
$ kubectl scale deployment worker --replicas=3
````