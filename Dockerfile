FROM node:20-alpine

# Создаем рабочую директорию
WORKDIR /usr/src/app

# Копируем файлы зависимостей
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install --frozen-lockfile

# Копируем все файлы проекта
COPY . .

# Собираем проект
RUN yarn build

# Команда запуска
CMD ["node", "dist/main"]