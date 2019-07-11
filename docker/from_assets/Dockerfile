FROM nginx:1.13.3-alpine

LABEL mainteiner="Patricio Perpetua <patricio.perpetua.arg@gmail.com>" \
    name="patricioperpetua/web" \
    architecture="x86_64" \
    vendor="SINGLETON" \
    vcs-type="git" \
    vcs-url="https://gitlab.com/patricioperpetua/web.git" \
    distribution-scope="private" \
    Summary="Image to run personal web site."

ARG ASSET_FOLDER=

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

#COPY nginx /etc/nginx/conf.d/

## From 'assets' copy over the artifacts in dist folder to default nginx public folder
COPY ./dist/${ASSET_FOLDER}/* /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
