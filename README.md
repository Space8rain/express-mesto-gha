[![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/Space8rain/express-mesto-gha/actions/workflows/tests-13-sprint.yml)
[![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/Space8rain/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Проект Mesto (backend)
Backend часть сервиса, с помощью которого пользователь может делиться фото с другими.

## Функионал:
- Регистрация / авторизация пользователя
- Добавление / удаление лайка фото
- Удаление фото
- Редактирование информации о себе и своего аватара

## Технологии:
- Express
- Node JS
- Mongo DB
- Postman

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта:
1. Клонировать репозиторий:
`https://github.com/Space8rain/express-mesto-gha`
2. Установить зависимости:
`npm ci`
3. Запустить приложение:
`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
