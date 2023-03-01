FROM node:18-bullseye-slim AS base

ARG UID=1000
ARG GID=1000

ENV WDIR=/usr/src/app

# Update the base image. 'curl' is installed to run the healthcheck
# Need to change the root user to something else. Not node tho'
RUN apt-get update && apt-get upgrade -y \
  # && groupadd -r nodegroup \
  && apt-get install -y curl

# The directory within the container COPY, RUN, CMD etc commands are executed
WORKDIR ${WDIR}

# Copy any NPM packages files from project into 'container image' WORKDIR location
COPY package*.json ./

# Deterministic install of NPM packages based on the 'package-lock.json'
RUN npm ci

COPY tsconfig.json ./

COPY src ./src

# Build the project to ./dist
FROM base AS build

# RUN apt-get update && apt-get upgrade -y

WORKDIR ${WDIR}

# Copy all the files across
COPY --from=base ${WDIR} ./

#  Build the project 
RUN npm run build

# Third step copies only nessessary files and runs
FROM build as production

WORKDIR ${WDIR}

COPY --from=build ${WDIR}/dist ./

EXPOSE 3000

CMD ["node", "./dist/server.js"]

