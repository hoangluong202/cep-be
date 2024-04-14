# Build an image starting with the Node 18.0.0 image.

# Use the official image as a parent image.
FROM node:18-alpine as build
# Set the working directory in the container to /app
WORKDIR /usr/src/app
# Copy package.json and package-lock.json from your host to the working directory.
COPY package*.json ./
# Install the app's dependencies into the node_modules folder in the container.
RUN npm install
# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .
# Compile code from TypeScript to JavaScript
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

RUN npm install --only=production

RUN rm package*.json

EXPOSE 3003

CMD ["node", "dist/main.js"]


