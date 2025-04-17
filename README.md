# REMAINS-REACT-APP

## Установка

   ```sh
   npx remains-react-app
   ```

Зависимости установятся **автоматически** после установки проекта, `npm install` не обязателен

## Инициализация

После установки создайте файл `.gitignore` и добавьте в него следующее:

```
# dependencies
/node_modules 
/.pnp
.pnp.js

# testing
/coverage

# production
/build
/dist

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

добавление `/node_modules` в `.gitignore` обязателен чтобы все установленые локально зависимости не попали в репозиторий

## Запуск проекта

Запустите локальный сервер разработки:
```sh
npm run start
```

## Сборка проекта

Для продакшн-сборки выполните:
```sh
npm run build
```