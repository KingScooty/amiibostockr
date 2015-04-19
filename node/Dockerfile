#FROM dockerfile/nodejs
#FROM node:latest
FROM node:0.12-onbuild

# Install nodemon
RUN npm install -g nodemon

# Provides cached layer for node_modules
#ADD package.json /tmp/package.json
#RUN cd /tmp && npm install
#RUN mkdir -p /src && cp -a /tmp/node_modules /src/

# Define working directory
#WORKDIR /src/node
#WORKDIR /src
#ADD . /src

# Expose port
EXPOSE  3000

# Run app using nodemon
CMD ["npm", "start"]
