FROM node:18-alpine as base
WORKDIR /app
COPY package*.json ./
ENV NODE_ENV=production 


FROM base as builder
WORKDIR /app
COPY . .
RUN npm ci  # Use npm ci for clean installs without dev dependencies
RUN npm run build  # Build your app


FROM node:18-alpine as production
WORKDIR /app
COPY --from=builder /app/.next ./.next  # Copy built Next.js files
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

ENV NODE_ENV=production  


RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3000
CMD ["npm", "start"]
