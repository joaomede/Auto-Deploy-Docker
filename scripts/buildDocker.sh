#!/bin/bash
## By João Medeiros - <symbol2studio@gmail.com>

version='v1.0.0'

yarn build
yarn build:view
sudo docker build -t joaomede/auto-deploy-docker:${version} . 
