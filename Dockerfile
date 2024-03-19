FROM node:lts-alpine3.19
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
EXPOSE ${PORT}
RUN npx prisma generate && npx prisma migrate deploy
CMD ["npm", "run", "start:dev"]