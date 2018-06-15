# Node JS 8.X
FROM node:carbon

# Install latest npm version (Npm 6)
RUN npm i -g npm@latest

# Create app directory
WORKDIR /usr/src/app

# Copy whole project
COPY ./backend ./backend
COPY ./shared ./shared

# Change to backend dir
WORKDIR ./backend

# Install dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm ci

EXPOSE 3000, 3001
CMD [ "npm", "run", "start" ]
