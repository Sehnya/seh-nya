# Multi-stage Dockerfile for Bun + React + Tailwind app
# Stage 1: Dependencies
FROM oven/bun:1 AS deps
WORKDIR /app

# Copy lockfile and package.json first for better layer caching
# Prefer text bun.lock so Bun can regenerate bun.lockb if needed
COPY bun.lock package.json ./
RUN bun install

# Stage 2: Build
FROM oven/bun:1 AS build
WORKDIR /app

# Reuse installed deps from deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the source
COPY . .

# Build frontend assets to static/dist
RUN bun run build

# Stage 3: Production runtime
FROM oven/bun:1 AS runner
WORKDIR /app
ENV NODE_ENV=production

# Reuse node_modules from deps stage (server doesn’t require dev tools at runtime)
COPY --from=deps /app/node_modules ./node_modules

# Copy only what the server needs
COPY package.json bun.lock ./
COPY public ./public
COPY src ./src
COPY --from=build /app/static/dist ./static/dist

EXPOSE 3000

# Start Bun server
CMD ["bun", "run", "serve"]
