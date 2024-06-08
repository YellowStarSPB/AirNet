FROM node:alpine

WORKDIR /app

EXPOSE 7777

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]
