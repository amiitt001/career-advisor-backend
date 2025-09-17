# 1. Use an official Node.js runtime as a parent image (Node.js 20)
FROM node:20-slim

# 2. Set the working directory in the container
WORKDIR /usr/src/app

# 3. Copy package files and install dependencies
# This step is cached to speed up future builds
COPY package*.json ./
RUN npm ci --only=production

# 4. Copy the rest of your application's source code
COPY . .

# 5. Define the command to run your app when the container starts
# This will run "npm start", which in turn runs "node server.js"
CMD [ "npm", "start" ]