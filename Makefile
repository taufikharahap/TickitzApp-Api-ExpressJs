# Project variables (adjust as needed)
PROJECT_NAME = your-express-project

# Paths (adjust as needed)
SRC_DIR = src
NODE_MODULES = node_modules

# Define targets

# Install dependencies
install:
  @npm install

# Run development server
dev: install
  @nodemon $(SRC_DIR)/server.js  # Adjust file path if your server file has a different name

# Run production server (assuming a separate start script in package.json)
prod: install
  @npm run start  # Replace with the appropriate script name from package.json

# Run tests (assuming tests are in a 'test' directory)
test: install
  @npm test

# Build the project (customize this section if needed)
build:

# Clean the project (customize this section if needed)
clean:
  @rm -rf $(NODE_MODULES)

# Default target (can be customized)
.PHONY: install dev prod test build clean

all: dev