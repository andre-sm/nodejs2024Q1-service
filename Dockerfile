FROM node:lts-alpine3.19
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start:dev"]