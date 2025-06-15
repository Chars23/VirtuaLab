#!/bin/bash
CONTAINER_NAME="lab-ubuntu"

# Check if the container is already running
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
  docker start -ai $CONTAINER_NAME
else
  docker run --rm -it --name $CONTAINER_NAME ubuntu:22.04 bash
fi
