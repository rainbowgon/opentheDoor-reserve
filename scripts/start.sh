#!/bin/bash

ROOT_PATH="/home/ubuntu/crawling"

CONTAINER="crawling_container"
IMAGE="crawling_image"

docker build -t "$IMAGE" "$ROOT_PATH"
docker run -dp 3000:3000 --name "$CONTAINER" "$IMAGE"