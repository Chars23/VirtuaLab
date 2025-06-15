#!/bin/bash
CONTAINER_NAME="lab-debian"

if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
  docker start -ai $CONTAINER_NAME
else
  docker run --rm -it --name $CONTAINER_NAME debian:latest bash
fi
