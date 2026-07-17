# Stage 1: Install dependencies
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ynpm-lock.yaml* pnpm-lock.yaml* bun.lockb* ./
RUN \
  if [ -f package-lock.json ]; then npm install; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Stage 2: Rebuild the source code
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f prisma/schema.prisma ]; then npx prisma generate; fi

 
RUN \
  if [ -f package-lock.json ]; then DATABASE_URL="postgresql://mock:mock@localhost:5432/mock?schema=public" npm run build; \
  elif [ -f pnpm-lock.yaml ]; then DATABASE_URL="postgresql://mock:mock@localhost:5432/mock?schema=public" pnpm build; \
  elif [ -f yarn.lock ]; then DATABASE_URL="postgresql://mock:mock@localhost:5432/mock?schema=public" yarn build; \
  else DATABASE_URL="postgresql://mock:mock@localhost:5432/mock?schema=public" npm run build; \
  fi

# Stage 3: Production runner
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]