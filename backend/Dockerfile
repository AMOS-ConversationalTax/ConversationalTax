# See https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

# Node JS 8.X
FROM node:carbon

# Install latest npm version (Npm 6)
RUN npm i npm@latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
