FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npm install --include=dev
RUN npm run build
EXPOSE 3000
RUN npm run start




