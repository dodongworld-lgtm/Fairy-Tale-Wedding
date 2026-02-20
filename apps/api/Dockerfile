FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
RUN npm ci --workspace=apps/api
COPY apps/api/ ./apps/api/
RUN cd apps/api && npx prisma generate && npx tsc
EXPOSE 4000
CMD ["node", "apps/api/dist/index.js"]
