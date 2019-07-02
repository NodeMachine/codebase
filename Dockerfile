FROM node:10

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

USER node

EXPOSE 8080

ENV NAME World

CMD ["npm", "start"]