#!/bin/bash

ROOT_PATH="/home/ubuntu/reserving"

CONTAINER="reserving_container"
IMAGE="reserving_image"

NETWORK="my-network"

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
docker network connect "$NETWORK" "$CONTAINER"

docker run -dp 3000:3000 --name reserving_container reserving_image
docker network connect my-network reserving_container