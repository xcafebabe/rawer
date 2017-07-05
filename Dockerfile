FROM node:7.10.0-alpine
MAINTAINER Luis Toubes <luis@toub.es>

## Rawer Root Folder
ARG RAWER_PATH=/rawer
ENV RAWER_PATH ${RAWER_PATH}

## Node Command to execute
ARG NODE_COMMAND=build
ENV NODE_COMMAND ${NODE_COMMAND}

## Installing gulp-cli and dependencies for gulp-imagemin
RUN npm install gulp-cli -g \ 
  && apk --update --no-cache \
		add  \
    automake \
		git \
		alpine-sdk  \
		nasm  \
		autoconf  \
		build-base \
		zlib \
		zlib-dev \
		libpng \
		libpng-dev\
		libwebp \
		libwebp-dev \
		libjpeg-turbo \
		libjpeg-turbo-dev

WORKDIR ${RAWER_PATH}
## Ignoring files from node_modules
COPY . . 
RUN chown node:node -R ${RAWER_PATH} 

VOLUME ["${RAWER_PATH}"]

## Expose the BrowserSyncPorts
EXPOSE 3000 3001

## Development Purposes
USER node

ENTRYPOINT ["sh", "-c", "${RAWER_PATH}/entrypoint.sh"]
