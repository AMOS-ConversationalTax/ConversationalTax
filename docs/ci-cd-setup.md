# Setup of CI and CD for our project

We use https://semaphoreci.com/ as our CI and CD provider. Its unique feature set in context of Docker complement each other perfectly with our requirements.

## CI

To get the CI running we need a litte bit of code. For setup:

```
nvm install 8
npm i -g npm@latest
```

For building and testing the frontend:

```
cd frontend
npm install
npm run test
npm run lint
```

For building and testing the backend:

```
cd backend
npm install
npm run test
npm run lint
```

Both, the backend and frontend tests, run in parallel.

## CD

### Build the Docker containers

This part is done by using https://semaphoreci.com/, too. One container is built for the Master branch of the GitHub project (Pushed to https://hub.docker.com/r/amosconversationaltax/conversational-tax/) and one for the Develop branch (Pushed to https://hub.docker.com/r/amosconversationaltax/conversational-tax-dev/).

The code for the Master branch is:

```
nvm install 8
npm i -g npm@latest
cd backend
npm install
docker build -t amosconversationaltax/conversational-tax .
docker push amosconversationaltax/conversational-tax
ssh -i /home/runner/.ssh/custom_id_rsa -p 236 -o "StrictHostKeyChecking=no" amos@[anonymous] "sudo /home/docker/amos_scripts/run_docker.sh master"
```

The code for the Develop branch is:

```
nvm install 8
npm i -g npm@latest
cd backend
npm install
docker build -t amosconversationaltax/conversational-tax-dev .
docker push amosconversationaltax/conversational-tax-dev
ssh -i /home/runner/.ssh/custom_id_rsa -p 236 -o "StrictHostKeyChecking=no" amos@[anonymous] "sudo /home/docker/amos_scripts/run_docker.sh develop"
```

### Deploy on CD-Server

We use an Debain Wheezy Rootserver with Docker installed for deployment of both containers. The IP of the Server is anonymous in the previous code snippets to protect integrity of the server.

Due to the fact that Docker containers have to be started with sudo rights, where is an extensive setup being made.

The key part of the deployment is the starting script for the containers (/home/docker/amos_scripts/run_docker.sh):

```
#!/bin/bash

# Variables
if [ $1 == "master" ]; then
  CONTAINERNAME="conversational-tax"
  CONTAINERIMAGE="amosconversationaltax/conversational-tax"
  PRIMARYPORT="3000"
else
  CONTAINERNAME="conversational-tax-dev"
  CONTAINERIMAGE="amosconversationaltax/conversational-tax-dev"
  PRIMARYPORT="3010"
fi

# Check whether the container is already running
RUNNING=$(docker inspect --format="{{.State.Running}}" $CONTAINERNAME 2> /dev/null)

if [ "$RUNNING" == "true" ]; then

  # Stop the running container
  echo "###########################################"
  echo "####### Stop the running container: #######"
  echo "###########################################"
  echo " "
  docker stop $CONTAINERNAME
  echo " "
  echo " "

  # Remove the stopped container
  echo "###########################################"
  echo "###### Remove the stopped container: ######"
  echo "###########################################"
  echo " "
  docker rm $CONTAINERNAME
  echo " "
  echo " "

fi

# Pull the newest image from DockerHub
echo "###########################################"
echo "## Pull the newest image from DockerHub: ##"
echo "###########################################"
echo " "
docker pull $CONTAINERIMAGE
echo " "
echo " "

# Start the new container
echo "###########################################"
echo "# Start the new latest docker container:  #"
echo "###########################################"
echo " "
docker run -p $PRIMARYPORT:3000 -d --name=$CONTAINERNAME --restart=always $CONTAINERIMAGE
echo " "
echo " "
```

The Linux user "amos" does not have any sudo rights, so there has to be a workaround (/etc/sudoers):

```
amos    ALL=(ALL) NOPASSWD: /home/docker/amos_scripts/run_docker.sh
```
