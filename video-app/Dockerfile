# build stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV HOSTNAME "0.0.0.0"

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

RUN npm install --production

EXPOSE 3000

CMD ["node", "server.js"]