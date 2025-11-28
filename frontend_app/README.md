# Lightweight React Template for KAVIA

This project now includes a Virtual Library UI built with the Ocean Professional theme.

## Features

- Top navigation with title and search
- Responsive grid of book cards
- Client-side search and tag filtering
- Book detail modal with metadata
- Mock data fallback; optional API fetch via env
- Runs on port 3000 (CRA default)

## Environment

The app can read these optional environment variables:
- `REACT_APP_API_BASE`
- `REACT_APP_BACKEND_URL`

If either is provided and exposes a `/books` endpoint returning an array of books, the app will try to load from it; otherwise it falls back to local mock data.

## Scripts

- `npm start` — Dev server at http://localhost:3000
- `npm test` — Tests
- `npm run build` — Production build

## Style

Ocean Professional color palette:
- Primary `#2563EB`
- Secondary `#F59E0B`
- Background `#f9fafb`
- Surface `#ffffff`
- Text `#111827`
