# Start a development container with hot reloading using Nodmon. NODE_ENV is development
dev:
	docker compose -f ./app/docker-compose.yml   -f ./app/docker-compose-dev.yml up

# Open terminal inside container 
term:
	docker exec -it app-app-1 bash

# Build the project in NODE_ENV production mode and run
prod:
	docker compose -f ./app/docker-compose.yml up --build
