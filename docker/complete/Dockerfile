FROM node:8.12.0-alpine

LABEL mainteiner="Patricio Perpetua <patricio.perpetua.arg@gmail.com>" \
    name="patricioperpetua/web" \
    architecture="x86_64" \
    vendor="SINGLETON SD" \
    vcs-type="git" \
    vcs-url="https://gitlab.com/patricioperpetua/web.git" \
    distribution-scope="private" \
    Summary="Image to run personal web site."

WORKDIR /usr/app

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
COPY package.json package-lock.json angular.json tsconfig.json tslint.json ./
COPY src src/

RUN apk add --no-cache git
RUN npm i --no-optional

## Install angular-cli
RUN npm install -g @angular/cli --no-optional

## Build the angular app in production mode and store the artifacts in dist folder
RUN ng build --prod --build-optimizer

## Remove everything but dist folder.

### STAGE 2: Setup ###

FROM nginx:1.13.3-alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY conf/nginx/nginx.config /etc/nginx/conf.d/default.conf

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=0 /usr/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
