FROM node:20-alpine3.16

WORKDIR /Frontend_app

EXPOSE 3002

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . .

CMD ["npm", "start"]