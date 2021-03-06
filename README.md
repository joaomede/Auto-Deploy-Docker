[![Build Status](https://travis-ci.com/joaomede/Auto-Deploy-Docker.svg?branch=master)](https://travis-ci.com/joaomede/Auto-Deploy-Docker) [![codecov](https://codecov.io/gh/joaomede/Auto-Deploy-Docker/branch/master/graph/badge.svg)](https://codecov.io/gh/joaomede/Auto-Deploy-Docker)
 ![GitHub](https://img.shields.io/github/license/joaomede/Auto-Deploy-Docker) ![GitHub package.json version](https://img.shields.io/github/package-json/v/joaomede/Auto-Deploy-Docker) ![GitHub repo size](https://img.shields.io/github/repo-size/joaomede/Auto-Deploy-Docker)


# Auto Deploy Docker
For automatic deployment.

### See Full [Documentation](https://joaomede.github.io/Auto-Deploy-Docker/)

## ABOUT
Auto Deploy Docker, as its name suggests, is a container deployment automation, if you have a container and intend to deploy it automatically, this is a tool that promises to solve, for that, it will use Webhook to fire the triggers and perform backend routines to stop the container, remove, clean old images and recreates everything again, lets play!

<a href="https://www.buymeacoffee.com/iSTozIC" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/lato-blue.png" alt="Buy Me A Coffee" style="height: 35px !important;width: 150px !important;" ></a>


## QuickStart with docker-compose
```sh
version: "3.3"

services:
  pg:
    image: postgres:11.5-alpine
    container_name: pg-database-auto-deploy
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: databaseName
    volumes:
      - ./postgres:/var/lib/postgresql/data
      - "/etc/localtime:/etc/localtime:ro"
    networks:
      - autodeploy-network

  server:
    image: joaomede/auto-deploy-docker:v1.0.0
    container_name: "server-auto-deploy"
    depends_on:
      - pg
    environment:
      HOSTDB: pg-database-auto-deploy
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin
      POSTGRES_DB: databaseName
      NODE_ENV: dev
      EMAIL: email@gmail.com
      PASSWORDSMTP: passwordEmail
      SECRET: youApiKeySecret
    ports:
      - 8080:80
    volumes:
      - "/etc/localtime:/etc/localtime:ro"
      - /var/run/docker.sock:/var/run/docker.sock
    networks:
      - autodeploy-network

networks:
  autodeploy-network:
    driver: bridge
```

## In what use case would this be useful to me?
* Question 1 - I have a fully insulated container in the docker, it depends on 2 other containers, all need bind volumes, to store persistent data safely, in addition to needing environment variables and commands, does this system suit me?
> Yes, Auto Deploy Container is designed for that specific need

* Question 2 - I have several virtual machines with a docker, is it possible to deploy remotely, that is, I schedule deployments on several different machines with this system?
> Yes, it is possible, however, each "deploy project" can have 1 or more containers, the remote target will be associated with the entity "project deploy" and not with the "containers" contained in the "project."

* Question 3 - Can I connect to a private registry with this technology?
> Yes, and No, if the remote machine, targeting the automation, is configured with a private registry, or has a private registry locally, the automation will certainly work, however, it will be necessary to properly inform the name of the image when configuring the template, also if configured by the composer or via Bash

## In what case will it not serve me?
* Question 1 - My container depends on files and external builds, that through the bind volume, it runs the application, will it work?  
> R - At first, no, if your container has entrypoints to solve everything, do git clones and perform update routines "something unusual", it may even work, but this system was designed for autonomous containers and not for hybrid "container + external things. ".

* Question 2 - My container is just an environment, it is incomplete, it requires a lot of manual settings, like installing local application and various types of volume binds, I can configure it with this automatic deployment system.  
> R - No, as stated earlier, the deployment will only take place well with fully insulated containers and prepared to run quickly


## Ok, I want to use, what kind of parameter can I define?
it is possible to define:
- Image Name
- Container Name 
- Commands
- Volume Bindings
- Networks (for now only bridge)
- Work Dir.
- Environments variables
- Tty
- Exposed Ports
- Port Bindings 
- and more settings...


## I understand that he performs a routine, what are the steps of these routines?
- 1 Stop the container
- 2 Remove the container
- 3 Remove self-image (if possible - for machine hygiene)
- 4 Downloading a newest Tag Image (setted in container template)
- 5 Recreates the container
- 6 Start a new container
- 7 Sends the report via email.

> This routine may vary according to specific problems, such as the fact that the container already exists, or the image cannot be removed (because it is in use by other containers)


## What is this made of?
In the backend there is an Api Rest, which is responsible for a simple (CRUD) that allows the creation of deploy projects and container templates, including also the user entity for system security, in addition to the API Rest, there is the core of the application, which would be the routines of deployment, they are responsible for implementing the system, the entire backend was written in typescript and most of it is asynchronous, on the client side, "Frontend", there is Vuejs with some dependencies.


## API Rest
List of All Endpoints
```sh
# Endpoints User
POST: /api/auth/login
POST: /api/auth/register
PUT: /api/auth/changepassword

# Endpoints Deploy
POST: /api/deploy/create
DELETE: /api/deploy/delete/:deployId
GET: /api/deploy/getall
PUT: /api/deploy/update/:deployId

# Endpoints Container
POST: /api/container/create/:deployId
DELETE: /api/container/delete/:deployId
GET: /api/container/getall/:deployId
PUT: /api/container/update/:containerId

# WebHook
POST: /api/deploy/webhook/:secret
```
