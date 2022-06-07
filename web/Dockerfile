FROM node:18

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/web
WORKDIR /usr/src/web

# Installing dependencies
COPY package*.json /usr/src/web/
RUN npm install

# Copying source files
COPY . /usr/src/web

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD "npm" "run" "dev"