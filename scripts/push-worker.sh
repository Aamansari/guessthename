#!/bin/bash

source scripts/variables.sh

echo "Pushing guessthename_worker and latest #$COMMIT"

docker push $REGISTRY_BASE_PATH/guessthename_worker:$COMMIT
docker push $REGISTRY_BASE_PATH/guessthename_worker:latest
