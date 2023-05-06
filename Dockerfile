FROM node:19.9-alpine

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

COPY /node_modules /node_modules

COPY ./dist ./dist

CMD ["yarn", "start:dev"]