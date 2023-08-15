FROM node:16-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./
RUN chown -Rh node:node . .

USER node

RUN npm install

COPY . .
EXPOSE 8080

CMD [ "node", "app.js" ]