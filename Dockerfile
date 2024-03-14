FROM node:lts-alpine3.19
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "start:dev"]