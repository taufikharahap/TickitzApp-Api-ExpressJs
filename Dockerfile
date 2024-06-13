# Define the base image
FROM node:20.14.0-alpine3.20 AS builder

RUN mkdir -p /app

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force && rm -rf node_modules && npm install

# Copy your application code
COPY . .

# Expose port (adjust if your app listens on a different port)
EXPOSE 8001

# Start command
CMD [ "npm", "start" ]
