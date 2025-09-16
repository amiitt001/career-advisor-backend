# Use the official Node.js 18 image as a base
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy the rest of your application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# The command to start the server when the container starts
CMD [ "node", "server.js" ]