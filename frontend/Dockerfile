FROM node:16.14.0-alpine

WORKDIR /app

COPY ./facebook/package*.json ./

RUN npm install
RUN npm install react-router-dom js-cookie axios
COPY ./facebook .
ENV NODE_PATH=/app/node_modules/.bin

EXPOSE 3000

CMD ["npm", "start"]