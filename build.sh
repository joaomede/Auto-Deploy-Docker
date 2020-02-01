#!/bin/bash
# by João Medeiros

docker run -it --rm -v $(pwd):/usr/src/app joaomede/nodejs12prod:1.0 yarn build