FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
RUN npm ci --workspace=apps/web
COPY apps/web/ ./apps/web/
RUN npm run build -w apps/web

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/package.json ./
RUN npm ci --production
EXPOSE 3000
CMD ["npm", "start"]
