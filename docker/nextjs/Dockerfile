# Use Node.js LTS image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY nextjs-spa/package.json package-lock.json ./
RUN npm install

# Copy all files and build the app
COPY nextjs-spa .
RUN npm run build

# Use a minimal image to serve the app
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public

# Install only production dependencies
RUN npm install --omit=dev

# Expose the Next.js default port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
