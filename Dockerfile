FROM node:20-alpine

WORKDIR /app

# Copy npm files for caching
COPY package.json package.json
COPY package-lock.json package-lock.json

# Remove husky prepare
RUN sed -i '/"prepare":/d' package.json

# Install production + optional express dependency
RUN npm ci --omit=dev
RUN npm cache clean --force

# Add everything else
COPY . .

ENV NODE_ENV production
USER node

CMD ["node", "express.js"]