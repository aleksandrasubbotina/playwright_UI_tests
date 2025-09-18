FROM mcr.microsoft.com/playwright:v1.54.2-jammy

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy project
COPY . .

# Default command: run full tests
CMD ["npm", "run", "test:full"]
