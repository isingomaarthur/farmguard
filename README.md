# Recess FarmGuard

This repository contains the FarmGuard application:
- `backend/` — Express API and MySQL database setup
- `farm-genie/` — Next.js frontend

## Local development

### Backend
```bash
cd backend
npm install
cp .env.example .env
# update .env values as needed
npm run dev
```

### Frontend
```bash
cd farm-genie
npm install
cp .env.example .env
# update .env values as needed
npm run dev
```

The frontend expects the backend API at `NEXT_PUBLIC_API_URL`, defaulting to `http://localhost:5000/api`.

## Railway deployment

This repo includes `railway.json` for a two-service Railway deployment.

### Service setup
- `farmguard-backend` (path: `backend`)
- `farmguard-frontend` (path: `farm-genie`)

### Railway environment variables

Backend:
- `PORT` (e.g. `5000`)
- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`
- `CORS_ORIGIN` (frontend URL)

Frontend:
- `NEXT_PUBLIC_API_URL` (backend API base URL, e.g. `https://<your-backend>.railway.app/api`)

Production preview:

- Live app URL: https://farmguard-production.up.railway.app

### Build and start commands

Backend uses:
```bash
npm install
npm run start
```

Frontend uses:
```bash
npm install
npm run build
npm run start
```

## Notes

- Self-registration is intentionally disabled in the current app.
- Admin-issued accounts and demo login are the supported entry flows.
- The app currently uses `http://localhost:5000/api` locally unless `NEXT_PUBLIC_API_URL` is overridden.
