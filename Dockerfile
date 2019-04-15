FROM node:latest

RUN apt-get update && \
    apt-get -y install sudo && \
    adduser node sudo && \
    echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER node

RUN mkdir /home/node/.npm-global ; \
    mkdir -p /home/node/app ; \
    chown -R node:node /home/node/app ; \
    chown -R node:node /home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

WORKDIR /home/node/app

RUN npm -g install serve

COPY . /home/node/app

RUN npm install
RUN sudo chmod -R 777 /home/node/app