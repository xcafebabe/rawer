FROM node:7.10.0-alpine
MAINTAINER Luis Toubes <luis@toub.es>

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
EXPOSE 3000 3001

## Development Purposes
USER node

CMD npm install && npm run ${NODE_COMMAND}
