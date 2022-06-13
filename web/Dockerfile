FROM node:alpine3.16

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/web
WORKDIR /usr/src/web

# Installing dependencies
COPY . /usr/src/web
RUN npm install

EXPOSE 3000

# Running the app
CMD "npm" "run" "dev"