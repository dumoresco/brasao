FROM node:22-alpine

WORKDIR /app
COPY . .
COPY package*.json ./

RUN yarn install


RUN yarn build

EXPOSE 8000

# Iniciar a aplicação
CMD ["yarn", "start"]
