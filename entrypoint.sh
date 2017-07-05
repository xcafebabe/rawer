#!/bin/sh

if [ "$*" == "" ];
then
  cd ${RAWER_PATH}
  npm install && npm run ${NODE_COMMAND}
else
  exec "$@"
fi
