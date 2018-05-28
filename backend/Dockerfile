# Node JS 8.X
FROM keymetrics/pm2:8-stretch

# Install latest npm version (Npm 6)
RUN npm i -g npm@latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY pm2.json .
COPY . .

RUN ls -al -R

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
RUN npm run build

RUN ls -al -R ./dist

EXPOSE 3000
CMD [ "pm2-runtime", "start", "pm2.json" ]
