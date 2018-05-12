# Getting Started - Backend

## TL;DR
- Clone repository and open /backend
- `npm i && npm run start`
- To dockerize it: `npm run docker:build && npm run docker:run`

## Getting Sarted

### Install
- Clone the repository.
- Open a terminal and navigate into the /backend folder
- Run `npm i` (You need to re-run this command everytime the dependencies inside the package.json have been changed.)

### Local Development
`npm run start` will launch nodemon, which watches for file changes and reloads the nestJS backend. A very useful tool to debug a RestAPI is "Postman". The backend will be available at localhost:3000

### Testing & Linting
Before you push your changes into the repository, you may want to run the tests with `npm run test` as well as the linting with `npm run lint`. (You can see a list of all npm run X commands inside the package.json)

### Docker
This part has only been tested under Linux (Debian).
- You may want to add your current user to the docker group. `sudo usermod -aG docker $USER`
- Run `npm run docker:build` inside the /backend dir to create the docker image.
- Run `npm run docker:run` to start the created image. 

## DialogFlow Auth
In order to use DialogFlow you need to provide an appropriate keyfile, which has to be placed at /backend/dialogflowKey.json

### Getting the Keyfile
- Log into the console of DialogFlow
- Go the the agents settings. (Left navigation on the top - settings symbol)
- Click onto your 'Service Account'. 
- In the new window, click on the three dots on the right side of the selected row.
- Choose to generate the key. 