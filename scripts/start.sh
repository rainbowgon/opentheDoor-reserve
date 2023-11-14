#!/bin/bash

ROOT_PATH="/home/ubuntu/app"

CONTAINER="crawling_container"
IMAGE="crawling_image"

REGION="ap-northeast-2"
GROUP="ssafy-openthedoor-log-group"
STREAM="reserving-log-stream"

docker build -t "$IMAGE" "$ROOT_PATH"
docker run \
    --log-driver=awslogs \
    --log-opt awslogs-region="$REGION" \
    --log-opt awslogs-group="$GROUP" \
    --log-opt awslogs-stream="$STREAM" \
    -dp 3000:3000 --name "$CONTAINER" "$IMAGE"