FROM alpine:3.14
RUN apk add --update git openssh nodejs npm
RUN npm install -g yarn typescript
