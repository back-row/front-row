
# Stage 1: Build the Vue 3 with Vite application
FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx as production-stage

# Create a directory to serve files from
RUN mkdir /app

# Copy the built application from the build stage
COPY --from=build-stage /app/dist /app

# Copy the custom Nginx configuration
COPY custom_nginx.conf /etc/nginx/conf.d/

# Copy the app/src/assets directory from your local system into the container
COPY src/assets /app/src/assets
COPY src/game/assets /app/src/game/assets

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

