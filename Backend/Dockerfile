FROM node:20-alpine

# Use the same working directory as docker-compose (keeps runtime paths consistent)
WORKDIR /usr/src/app

# only copy package files first (cache deps)
COPY package*.json ./

# install all deps inside the container (including nodemon)
RUN npm ci

# now copy the rest of your app
COPY . .

EXPOSE 4000

# Default to the npm start script (docker-compose may override)
CMD ["npm", "run", "start"]
