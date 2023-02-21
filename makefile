dev:
	docker compose -f ./app/docker-compose.yml   -f ./app/docker-compose-dev.yml up

prod:
	docker compose -f ./app/docker-compose.yml up --build
