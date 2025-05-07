FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8000

# Iniciar a aplicação
CMD ["yarn", "start"]
