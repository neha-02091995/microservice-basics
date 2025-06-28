# service-a/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port (adjust based on your app)
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
