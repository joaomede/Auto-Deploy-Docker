#!/bin/bash
## By João Medeiros - <symbol2studio@gmail.com>

read -p "New Tag Version: " version

sudo docker run -it --rm -v $(pwd):/usr/src/app joaomede/nodejs12prod:1.0 yarn build:view
sudo docker run -it --rm -v $(pwd):/usr/src/app joaomede/nodejs12prod:1.0 yarn build
sudo docker build -t joaomede/auto-deploy-docker:${version} .