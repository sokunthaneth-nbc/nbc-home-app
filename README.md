This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:
# Node: 22.14.0

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Build Docker Image

```
docker build -t nbc-home-app .

docker tag nbc-home-app sokunthaneth/nbc-home-app:latest

docker push sokunthaneth/nbc-home-app
```

## Build Android App from PWA

```
npm i -g @bubblewrap/cli

cd apk_build

bubblewrap init --manifest=https://<pwa_hosting_url>/manifest.json

bubblewrap build
```

## Build iOS App from PWA

```
paste <pwa_hosting_url> to https://www.pwabuilder.com/

generate package as iOS app!
```