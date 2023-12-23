# Stage 1: Build React app with Webpack
FROM node:latest as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code to the container
COPY . .

RUN npm run build
 
FROM nginx:alpine

# Copy the built assets from the build stage to Nginx's default HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 3000
# Nginx is automatically started by the base image