FROM node:16-alpine

RUN apk --update --upgrade add git openssh curl zsh
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

RUN npm install -g npm@latest
