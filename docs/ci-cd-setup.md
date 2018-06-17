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
npm ci
npm run test
npm run lint
```

For building and testing the backend:

```
cd backend
npm ci
npm run test
npm run lint
```

Since the 17.06.2018 we test the basic ability of the backend to run in the CD environment. As it is usefull to know how the CD works, before knowing how the CD tests are working, these tests are described in the last section of the documentation.

All of them, the backend, the frontend tests and the cd tests, run in parallel. All branches are tested by https://semaphoreci.com/ automaticly after a new commit. A passing test is prerequisite for merging a branch into Master or Develop. The Master branch and the Develop branch have some cool badges, too:

### Master Branch

Build status for the Master branch should be green all the time: 

[![Build Status](https://semaphoreci.com/api/v1/dominik-probst/conversationaltax-3/branches/master/badge.svg)](https://semaphoreci.com/dominik-probst/conversationaltax-3)

### Develop Branch

Build status for the Develop branch should be green all the time, too:

[![Build Status](https://semaphoreci.com/api/v1/dominik-probst/conversationaltax-3/branches/develop/badge.svg)](https://semaphoreci.com/dominik-probst/conversationaltax-3)

To be totally honest with you: All branches should feature a green build status. **All the time!**

## CD

### Build the Docker containers

This part is done by using https://semaphoreci.com/, too. One container is built for the Master branch of the GitHub project (Pushed to https://hub.docker.com/r/amosconversationaltax/conversational-tax/), one for the Develop branch (Pushed to https://hub.docker.com/r/amosconversationaltax/conversational-tax-dev/) and one for manual tests (Pushed to https://hub.docker.com/r/amosconversationaltax/conversational-tax-test/).

The code for the master branch is:

```
nvm install 8
npm i -g npm@latest exp
cd backend
docker build -t amosconversationaltax/conversational-tax ../.
docker push amosconversationaltax/conversational-tax
ssh -i /home/runner/.ssh/custom_id_rsa -p 236 -o "StrictHostKeyChecking=no" amos@[anonymous] "sudo /home/docker/amos_scripts/run_docker.sh master"
```

It is simple to mention that `amosconversationaltax/conversational-tax` has to be replaced with `amosconversationaltax/conversational-tax-dev` for develop and `amosconversationaltax/conversational-tax-test` for the manual test deployment.

### Building and Deploying the Frontend

Similar to the backend build, we use SemaphoreCI's tools for the frontend CD. The code for both branches is:

```
cd ../frontend
npm ci
exp login -u $USERNAME -p $PASSWORD
sed -i -e s/WillBeReplacedAutomatically/$(date +%d.%m.%Y)/ ../shared/config/config.ts
sed -i -e 's/localhost:3000/$URL:$PORT/g' ../shared/config/config.ts
sed -i -e 's/localhost:3001/$URL:$PORT/g' ../shared/config/config.ts
sed -i -e 's/conversational-tax/conversational-tax-$BRANCH/g' app.json
sed -i -e 's/Conversational Tax/Conversational Tax ($BRANCH)/g' app.json
npm run publish
```
(The environment variables USERNAME, PASSWORD have to be set through SemaphoreCI. The URL is replaced with the IP of our CD server and the PORT is replaced with 3000 for the master branch and 3010 for the develop branch. The BRANCH is directly replaced with develop or master.)

### Deploy on CD-Server

We use an Debain Wheezy Rootserver with Docker installed for deployment of both containers. The IP of the Server is anonymous in the previous code snippets to protect integrity of the server. Also we will not post our config files here. 

#### Docker-Compose files and starting script

The key part of the deployment are the Docker-Compose files for the containers. This one is for the master branch (/home/docker/amos_scripts/master/docker-compose.yml):

```
version: '2'
services:
    conversational-tax:
        restart: always
        image: amosconversationaltax/conversational-tax
        container_name: conversational-tax
        depends_on:
            - mongo
        privileged: true
        ports:
            - 3000:3000
            - 3001:3001
        links:
            - mongo
        volumes:
            - /home/docker/amos_files/config/config.ts:/usr/src/app/shared/config/config.ts
    mongo:
        restart: always
        image: mongo
        container_name: conversational-tax-mongo
        expose:
            - 27017
        volumes:
            - /home/docker/amos_data/conversational-tax-mongo:/data/db
```

And this one for the develop branch (/home/docker/amos_scripts/develop/docker-compose.yml):

```
version: '2'
services:
    conversational-tax-dev:
        restart: always
        image: amosconversationaltax/conversational-tax-dev
        container_name: conversational-tax-dev
        depends_on:
            - mongo
        privileged: true
        ports:
            - 3010:3000
            - 3011:3001
        links:
            - mongo
        volumes:
            - /home/docker/amos_files/config/config.ts:/usr/src/app/shared/config/config.ts
    mongo:
        restart: always
        image: mongo
        container_name: conversational-tax-dev-mongo
        expose:
            - 27017
        volumes:
            - /home/docker/amos_data/conversational-tax-dev-mongo:/data/db
```

And this one for the manual tests:

```
version: '2'
services:
    conversational-tax-test:
        restart: always
        image: amosconversationaltax/conversational-tax-test
        container_name: conversational-tax-test
        depends_on:
            - mongo
        privileged: true
        ports:
            - 3020:3000
            - 3021:3001
        links:
            - mongo
        volumes:
            - /home/docker/amos_files/config/config.ts:/usr/src/app/shared/config/config.ts
    mongo:
        restart: always
        image: mongo
        container_name: conversational-tax-test-mongo
        expose:
            - 27017
        volumes:
            - /home/docker/amos_data/conversational-tax-test-mongo:/data/db
```

Another key part of the deployment is the starting script for the containers (/home/docker/amos_scripts/run_docker.sh):

```
#!/bin/bash

echo "###########################################"
echo "######## Enter correct directory:  ########"
echo "###########################################"

if [ $1 == "master" ]; then

  cd /home/docker/amos_scripts/master
  echo " "
  echo "Entered /home/docker/amos_scripts/master successfully"
  echo " "

elif [ $1 == "develop" ]; then

  cd /home/docker/amos_scripts/develop
  echo " "
  echo "Entered /home/docker/amos_scripts/develop successfully"
  echo " "

elif [ $1 == "test" ]; then

  cd /home/docker/amos_scripts/test
  echo " "
  echo "Entered /home/docker/amos_scripts/test successfully"
  echo " "

else

  echo "USAGE: ./run_docker.sh [branch]"
  echo "Use (master, develop, test) for branch"
  exit 1

fi

echo "###########################################"
echo "############ Pull new images:  ############"
echo "###########################################"

echo " "
docker-compose pull
echo " "

# We do not need to stop containers as docker-compose
# up will decide whether this is needed or not

echo "###########################################"
echo "########## Start new containers: ##########"
echo "###########################################"

echo " "
docker-compose up -d
echo " "
```

The Linux user "amos" does not have any sudo rights (Docker container have to be strated with sudo rights) as he should not be able to do anything than starting the both CD containers. There has to be a workaround (/etc/sudoers):

```
amos    ALL=(ALL) NOPASSWD: /home/docker/amos_scripts/run_docker.sh
```

## CD tests

As mentioned in the CI section, we run some simple tests to proof the basic ability of the backend to run in the CD environment in the CI. As the other two CI tests, the setup of this test works with the following setup code:

```
nvm install 8
npm i -g npm@latest
```

The actual test looks like this:

```
cd backend
docker build -t conversational-tax-test ../.
cd /home/runner/
docker-compose up -d
wget --spider http://localhost:3000
docker logs conversational-tax-test
```

The most significant line in this test is `wget --spider http://localhost:3000`, as this tests if the backend is reachable. If this line fails there is a bug in the code, that prevents the code from running in an Docker container. `docker logs conversational-tax-dev` dient in diesem Fall dazu die passende Fehlermeldung auszugeben um eine Identifikation des Problems zu erleichtern.

It is also to mention that we have two files integrated in /home/runner/. One of them is the `config.ts` and one of them is the `docker-compose.yml`:

```
version: '2'
services:
    conversational-tax-test:
        restart: always
        image: conversational-tax-test
        container_name: conversational-tax-test
        depends_on:
            - mongo
        privileged: true
        ports:
            - 3000:3000
            - 3001:3001
        links:
            - mongo
        volumes:
            - /home/runner/config.ts:/usr/src/app/shared/config/config.ts
    mongo:
        restart: always
        image: mongo
        container_name: conversational-tax-test-mongo
        expose:
            - 27017
        volumes:
            - /home/runner/conversational-tax-test-mongo:/data/db
```
