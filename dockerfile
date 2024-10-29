# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the backend source code
COPY . .

EXPOSE 3001

# Start the backend service
CMD ["npm", "run", "start:dev"]
