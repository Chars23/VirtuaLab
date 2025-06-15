#!/bin/bash
CONTAINER_NAME="lab-kali"

if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
  docker start -ai $CONTAINER_NAME
else
  docker run --rm -it --name $CONTAINER_NAME kalilinux/kali-rolling /bin/bash
fi
