# Use an official lightweight Node.js image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy only package files to install dependencies first (layer caching)
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of your server code
COPY . .

# Expose the port your backend runs on
EXPOSE 3001

# Command to run your backend (adjust if needed)
CMD ["npm", "run", "dev"]
