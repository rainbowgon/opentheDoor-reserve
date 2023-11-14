#!/bin/bash

STOP_LOG="$ROOT_PATH/stop.log"
CONTAINER="crawling_container"
IMAGE="crawling_image"

if docker container inspect "$CONTAINER" >/dev/null 2>&1; then
    echo "container exists locally" >> $STOP_LOG
    docker stop "$CONTAINER"
    docker rm "$CONTAINER"
else
    echo "container does not exist locally" >> $STOP_LOG
fi
if docker image inspect "$IMAGE" >/dev/null 2>&1; then
    echo "Image exists locally" >> $STOP_LOG
    docker rmi "$IMAGE"
else
    echo "Image does not exist locally" >> $STOP_LOG
fi