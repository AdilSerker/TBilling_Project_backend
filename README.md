## Создание базы данных:

```sh
psql -c "create user researcher with password 'researcher'" postgres
psql -c "createdb billing;" postgres
```
## Разворачивание проекта

Установка зависимостей

```sh
yarn install
```
Сборка проекта

```sh
yarn build
```

Запуск миграций

```sh
yarn migrate
```

Запуск приложения
```sh
yarn start
```

## Команды

**Миграции**

```sh
yarn migrate # накатить миграции

yarn migrate-undo # откатить миграции

yarn create-migration MIGRATION_NAME # создать миграцию
```

**Разработка**
```sh
yarn build-dev # запуск компиляции в режиме --watch

yarn watch # запуск сервера в режиме --watch
```
