FROM node:19.9-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

COPY ./dist ./dist

CMD ["yarn", "start:dev"]