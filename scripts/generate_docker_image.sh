#!/usr/bin/env bash

# Web Page of BASH best practices https://kvz.io/blog/2013/11/21/bash-best-practices/
#Exit when a command fails.
set -o errexit
#Exit when script tries to use undeclared variables.
set -o nounset
#The exit status of the last command that threw a non-zero exit code is returned.
set -o pipefail

#Trace what gets executed. Useful for debugging.
#set -o xtrace

# Set magic variables for current file & dir
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"
__base="$(basename ${__file} .sh)"
__root="$(cd "$(dirname "${__dir}")" && pwd)"

if ! type "docker" &> /dev/null; then
  echo "Docker is not installed. Install it and then re launch"
  exit 1
fi

function usage(){
  echo -e "First Argument: tag"
  echo -e "Secound Argument: name"
  echo -e "Third Argument: git commit sha"
}

TAG=latest
NAME=registry.gitlab.com/ravimosharksas/frontends/office
DOCKERFILE=from_assets
CI_COMMIT_SHA=$(git rev-parse HEAD | cut -c 1-8)
PUSH=0
ASSET_FOLDER="dist-root"

if [ ! -z ${DOCKER_IMAGE_BASE_NAME+x} ]; then
  BASENAME=${DOCKER_IMAGE_BASE_NAME}
fi

if [ $# -lt 3 ]; then
  echo -e "Illegal number of parameters"
  echo -e "$(usage)"
  if [ $# -eq 1 ]; then
    echo "Running with IMAGE_NAME=${NAME}:${TAG}"
  else
    read -r -p "Do you want to run script with IMAGE_NAME=${NAME}:${TAG}? [y/N] " response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]
    then
        echo "Running with IMAGE_NAME=${NAME}:${TAG}"
    else
        exit 1;
    fi
  fi
else
    NAME=${1}
    TAG=${2}
    if [ "${TAG}" == "master" ]; then
      TAG="latest"
    fi
    CI_COMMIT_SHA=${3}
    if [ $# -ge 4 ]; then
      PUSH=$4
    fi
    if [ $# -ge 5 ]; then
      DOCKERFILE=$5
    fi
    if [ $# -ge 6 ]; then
      ASSET_FOLDER=$6
    fi
fi

DATE="$(date --rfc-2822 | sed 's/ /T/; s/\(\....\).*-/\1-/g')"

rm -f .dockerignore
ln -fs docker/${DOCKERFILE}/.dockerignore .dockerignore

docker build --rm -f docker/${DOCKERFILE}/Dockerfile -t \
    ${NAME}:${TAG} \
    --label "version=${TAG}" \
    --label "vcs-ref=${CI_COMMIT_SHA}" \
    --label "build-date=${DATE}" \
    --build-arg ASSET_FOLDER="${ASSET_FOLDER}" .

if [ "${PUSH}" == "1" ]; then
  docker push ${NAME}:${TAG}
fi
