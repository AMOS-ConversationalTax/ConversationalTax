# Getting Started - Backend

## TL;DR
- Clone repository and open /backend
- `npm i && npm run start`
- To dockerize it: `npm run docker:build && npm run docker:run`

## Getting Started

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

### Adding MongoDB
Our database MongoDB is running with Docker, too
- Run `npm run docker:createnet` to create a Docker network for communication between the containers. This has to be done *before* using `npm run docker:run`.
- Run `npm run docker:runmongo` to start MongoDB