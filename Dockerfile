FROM node:20-alpine AS builder

WORKDIR /app

RUN apk update && apk upgrade
RUN apk add curl

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build prisma and Next.js app
RUN npx prisma generate
RUN npm run build

# Runner service
FROM node:18-alpine AS runner

WORKDIR /app

# Create nonroot user
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot
USER nonroot

# Restructure build files
COPY --from=builder --chown=nonroot:nonroot /app/.next/standalone ./
COPY --from=builder --chown=nonroot:nonroot /app/public ./public
COPY --from=builder --chown=nonroot:nonroot /app/.next/static ./.next/static

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD ["node", "server.js"]