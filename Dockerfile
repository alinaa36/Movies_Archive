
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8050

CMD ["npm", "run", "start:dev"]
