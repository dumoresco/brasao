FROM node:22-alpine

WORKDIR /app
COPY . .

COPY package*.json ./
RUN yarn install


EXPOSE 8000

CMD ["yarn", "start"]
