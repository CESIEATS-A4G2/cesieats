FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build  # Compile TypeScript en JavaScript

CMD [ "node", "dist/index.js" ]