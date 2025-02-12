# Stage 1: Build the Vite React app
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install

# Copy all source files and build the app
COPY . .
RUN npm run build

# Stage 2: Serve the built files using nginx
FROM nginx:alpine
# (Optional) Remove default nginx website files
RUN rm -rf /usr/share/nginx/html/*
# Copy build output from previous stage into nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 and run nginx in the foreground
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
