# Dockerfile
FROM node:7

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Build and optimize react app
RUN npm run build
RUN npm install pushstate-server -g

EXPOSE 8082

# defined in package.json
CMD [ "pushstate-server", "./build", "8082" ]