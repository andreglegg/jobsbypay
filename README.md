## JobsByPay

JobsByPay highlights developer job listings in Norway that advertise salary information so you can compare opportunities quickly.

The project is split into a modern React + TypeScript front-end and a lightweight Express + TypeScript scraper that used to mirror listings from Stack Overflow Jobs (now retired).

### Front-end
- Built with Vite, React 18, React Router 6, and TypeScript.
- Component-first styling with CSS modules.
- Tested with Vitest and Testing Library.

```bash
npm install
npm run dev    # start the development server on http://localhost:5173
npm run build  # create a production build
npm run preview
npm run test   # run unit tests with Vitest
npm run lint   # lint the source code with ESLint + TypeScript support
```

Set `VITE_JOBS_ENDPOINT` before `npm run dev` to point at a different scraper endpoint when developing locally.

### Backend scraper
- Express 4 with async/await, Axios, Cheerio, node-schedule, and TypeScript.
- Emits `public/output.json` every 6 hours (or on demand via `/scrape`).
- Stack Overflow Jobs shut down its public feed in 2022, so the scraper currently serves archived data while we evaluate replacement sources.

```bash
cd backend
npm install
npm run dev    # run the scraper with ts-node
npm run build  # compile to dist/
npm start      # serve compiled output
```

✅ Live deployment: https://andreglegg.github.io/jobsbypay
