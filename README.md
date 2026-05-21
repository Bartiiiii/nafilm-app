# NaFilM Action MVP

Mobile-first PWA prototype for NaFilM visitors. The app covers the MVP journey:

1. Create a mock ticket.
2. Open the digital QR ticket.
3. Start The Filmmaker's Journey.
4. Complete six room missions.
5. Earn Film Credits and badges.
6. Reveal a film identity.
7. Unlock Top 5 movie recommendations.
8. Save movies, view rewards, and play Film Run.

## Tech

- Next.js App Router
- TypeScript
- Tailwind CSS
- localStorage persistence
- PWA manifest and production service worker

## Run

```bash
npm install
npm run dev
```

The current verification server is running at:

```text
http://localhost:3001
```

## Build

```bash
npm run build
```

## Content

Mock content is stored in `src/data`:

- `levels.ts`
- `movies.ts`
- `rewards.ts`
- `badges.ts`
- `tickets.ts`
- `userProgress.ts`
