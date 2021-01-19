FROM node:14-alpine

WORKDIR /src

ADD package.json /src

RUN yarn

ADD . /src

CMD yarn watch-node