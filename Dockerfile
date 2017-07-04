FROM node:7.10.0-alpine
MAINTAINER Luis Toubes <luis@toub.es>

## Browsersync
ARG BROWSERSYNC_PORT_UI=3001
ENV BROWSERSYNC_PORT_UI ${BROWSERSYNC_PORT_UI}

ARG BROWSERSYNC_PORT=3000
ENV BROWSERSYNC_PORT ${BROWSERSYNC_PORT}

## Rawer Root Folder
ARG RAWER_PATH=/rawer
ENV RAWER_PATH ${RAWER_PATH}

## Node Command to execute
ARG NODE_COMMAND=build
ENV NODE_COMMAND ${NODE_COMMAND}

## Installing gulp-cli Hexo Cli Component
RUN npm install gulp-cli -g

WORKDIR ${RAWER_PATH}
## Ignoring files from node_modules
COPY . . 
RUN chown node:node -R ${RAWER_PATH} 

VOLUME ["${RAWER_PATH}"]

## Expose the BrowserSyncPorts
EXPOSE ${BROWSERSYNC_PORT}
EXPOSE ${BROWSERSYNC_PORT_UI}

## Development Purposes
USER node

CMD npm install && npm run ${NODE_COMMAND}
