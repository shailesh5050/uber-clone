FROM node:20-alpine

WORKDIR /app

# only copy package files first
COPY package*.json ./

# install deps inside the container
RUN npm ci --only=production

# now copy the rest of your app
COPY . .

EXPOSE 4000

CMD ["node", "server.js"]
