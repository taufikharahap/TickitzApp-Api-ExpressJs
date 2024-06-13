# Define the base image
FROM node:20.14.0-alpine3.20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy your application code
COPY . .

# Define the serving image (optional)
FROM node:20.14.0-alpine3.20 AS runner

# Set working directory
WORKDIR /app

# Copy your application code
COPY . .

ENV PATH="/app:${PATH}"

# Expose port (adjust if your app listens on a different port)
EXPOSE 8001

# Start command
CMD [ "npm", "start" ]
