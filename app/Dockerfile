FROM node:18-bullseye-slim AS base

# Update the base image
RUN apt-get update && apt-get upgrade -y

# The directory within the container COPY, RUN, CMD etc commands are executed
WORKDIR /usr/src/app

# Copy any NPM packages files from project into 'container image' WORKDIR location
COPY package*.json ./

# Deterministic install of NPM packages based on the 'package-lock.json'
RUN npm ci

COPY tsconfig.json ./

COPY src ./src

# Build the project to ./dist
FROM base AS build

RUN apt-get update && apt-get upgrade -y

WORKDIR /usr/src/app

# Copy all the files across
COPY --from=base /usr/src/app ./

#  Build the project 
RUN npm run build

# Third step copies only nessessary files and runs
FROM build as production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./

EXPOSE 3000

CMD ["node", "./dist/server.js"]

