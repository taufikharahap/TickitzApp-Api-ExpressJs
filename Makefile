# Install dependencies
install:
  npm install

prod: install
  npm run start

migrate-up:
	db-migrate up

migrate-down:
	db-migrate down

# Default target (can be customized)
.PHONY: install prod migrate-up migrate-down

all: dev