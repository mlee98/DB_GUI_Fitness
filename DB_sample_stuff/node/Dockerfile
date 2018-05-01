FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app
RUN npm install
RUN npm install hapi-auth-jwt2@7.3.0
RUN npm install jsonwebtoken
RUN npm install hapi-redis-connection

# Bundle app source
COPY server.js /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]
