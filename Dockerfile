FROM node:lts-alpine3.19
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
EXPOSE ${PORT}