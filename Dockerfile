# Use the base image with Node
FROM node:18.17.1-alpine AS builder

# Set the working directory in the container
WORKDIR /nxlog-test

# Copy package files
COPY package*.json ./

# Optionally: If you use 'npm ci' to install dependencies, it expects a package-lock.json file
# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Ensure the port used by your app is exposed
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]