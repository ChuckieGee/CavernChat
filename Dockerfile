# Use a lighter version of Node as a parent image
FROM node:10.13-alpine

ENV NODE_ENV production

# Set the working directory to
WORKDIR /usr/src/app

# copy package.json into the container at workdir
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# install dependencies
RUN npm install --production --silent && mv node_modules ../

# Copy the current directory contents into the container at workdir
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD npm start