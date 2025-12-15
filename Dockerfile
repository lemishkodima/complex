# complex/Dockerfile

# --- build stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# 1. Залежності
COPY package*.json ./
RUN npm install

# 2. Код
COPY . .

# 3. Білд Next.js
RUN npm run build

# --- runtime stage ---
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# 4. Копіюємо усе з builder (код, .next, public, node_modules тощо)
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "run", "start"]
