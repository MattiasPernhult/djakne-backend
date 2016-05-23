FROM node:5.3.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/

EXPOSE 4000

CMD npm install && npm start

