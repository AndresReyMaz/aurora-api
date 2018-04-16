FROM node:8
WORKDIR /aurora-api
COPY package.json /aurora-api
RUN npm install
COPY . /aurora-api

EXPOSE 8081

CMD npm start

