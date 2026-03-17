# ── 開発ステージ ──────────────────────────────────────────
FROM node:20-alpine AS dev

WORKDIR /app

# パッケージファイルだけ先にコピーしてキャッシュを効かせる
COPY package*.json ./
RUN npm ci

EXPOSE 3000

# ソースはボリュームマウントで渡すのでここではコピーしない
CMD ["npm", "run", "dev"]


# ── ビルドステージ ────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# ── プロダクションステージ ────────────────────────────────
FROM node:20-alpine AS prod

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

EXPOSE 3000
CMD ["npm", "run", "start"]
