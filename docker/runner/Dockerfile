FROM --platform=linux/amd64 node:16.13.2

WORKDIR runner/

ENV RUNNER_ALLOW_RUNASROOT="1"

RUN npm install -g npm@latest
RUN npm install -g commitizen
RUN npm install -g --save-dev --save-exact prettier
RUN npm install -g jest

# Install Github Runner
RUN apt update -y
# Download
RUN curl -o actions-runner-linux-x64-2.287.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.287.1/actions-runner-linux-x64-2.287.1.tar.gz
# Installer
RUN tar xzf ./actions-runner-linux-x64-2.287.1.tar.gz

# Running container and then
## get your token here https://github.com/lunes-platform/lunesjs/settings/actions/runners/new
# RUN ./config.sh --url https://github.com/lunes-platform/lunesjs --token YOUR_TOKEN
# RUN ["./run.sh"]
