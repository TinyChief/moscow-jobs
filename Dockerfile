#Installation stage
FROM node:19-alpine AS install

WORKDIR /frontend

COPY package.json package-lock.json ./
RUN npm install

COPY src/ ./src
COPY public/ ./public
COPY index.html vite.config.js .eslintrc.cjs ./


# Development stage
FROM install AS dev

WORKDIR /frontend

ARG SERVER_PORT
ENV SERVER_PORT=$SERVER_PORT
ARG API_URL
ENV VITE_API_URL=$API_URL

ENV VITE_FAKE_DB=false
ENV VITE_API_PREFIX=""

ENTRYPOINT [ "sh", "-c", "npm run dev -- --host --port $SERVER_PORT" ]


# Build stage
FROM install AS build

WORKDIR /frontend

ARG API_URL
ENV VITE_API_URL=$API_URL

ENV VITE_FAKE_DB=false

ARG API_PREFIX
ENV VITE_API_PREFIX=$API_PREFIX

RUN npm run build


# Production run stage
FROM node:19-alpine AS prod

WORKDIR /frontend

RUN npm install -g http-server

COPY --from=build /frontend/dist /frontend/

ARG SERVER_PORT
ENV SERVER_PORT=$SERVER_PORT

ENTRYPOINT [ "sh", "-c", "http-server ./ -p $SERVER_PORT" ]
