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
#### Docker/Linux
Our database MongoDB is running with Docker, too
- Run `npm run docker:createnet` to create a Docker network for communication between the containers. This has to be done **before** using `npm run docker:run`.
- Run `npm run docker:runmongo` to start MongoDB

The database itself is now available as `mongodb://mongo` within the created Docker container.
#### Windows
- Download MongoDB at https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.6.4-signed.msi/download
- Follow the instructions.
- Optional: The setup will ask you to install MongoDB Compass. You can access your database very comfortable with it and have a graphical View of it.
- To run MongoDB open the Command Prompt.
- run `"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"`

The server will be available at `mongodb://localhost:27017`

### Simulate Rest API interaction with the Database

- Install `Postman`
- run the project with `npm run start`

The backend is now available at `http://localhost:3000`

- Open `Postman`
- Select in the start screen `POST` as the method
- Type the URL of the needed database
-- In this case its `http://localhost:3000/posts`
- Then add a new header with name `Content-Type` and value `application/json`
- Now go to the body tab and set body type raw and paste the following content:

`{"title": "this is post one", "content": "You've gotta write clearer so you can be read when you're dead", "userId": "5ab25d50740ce24b63cc9c83"}`

- Now press Send
- The result will be visible at `http://localhost:3000/posts`


## DialogFlow Auth
In order to use DialogFlow you need to provide an appropriate keyfile, which has to be placed at /backend/dialogflowKey.json

### Getting the Keyfile
- Log into the console of DialogFlow
- Go the the agents settings. (Left navigation on the top - settings symbol)
- Click onto your 'Service Account'. 
- In the new window, click on the three dots on the right side of the selected row.
- Choose to generate the key. 
