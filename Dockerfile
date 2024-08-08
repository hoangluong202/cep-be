# Build stage
FROM node:18-alpine as build

# Set the working directory in the container to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and yarn.lock from your host to the working directory
COPY package*.json yarn.lock ./

# Install the app's dependencies into the node_modules folder in the container
RUN yarn install

# Copy the rest of your app's source code from your host to your image filesystem
COPY . .

# Compile code from TypeScript to JavaScript
RUN yarn build

# Production stage
FROM node:18-alpine

# Set the working directory in the container to /usr/src/app
WORKDIR /usr/src/app

# Copy the compiled code from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Copy package.json and yarn.lock from your host to the working directory
COPY package*.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production

# Clean up the package.json and yarn.lock files
RUN rm package*.json yarn.lock

# Expose the application port
EXPOSE 3003

# Command to run the application
CMD ["node", "dist/main.js"]