# Edlumina Excellence Centre

MERN site for Edlumina Excellence Centre in Kukatpally, Hyderabad.

- `client/` — React + Vite frontend
- `server/` — Express + MongoDB enquiry API

## Prerequisites

- Node.js 22 or later
- MongoDB running locally, or a MongoDB Atlas connection string

## Environment

Copy the example files. **Never commit `.env` files.** They can contain the database URI and other secrets.

```bash
copy server\.env.example server\.env
copy client\.env.example client\.env
```

On macOS/Linux:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Root `.env.example` lists the main names:

```
MONGODB_URI=
PORT=
CLIENT_URL=
WEBINAR_URL=
WORKSHOP_URL=
```

How those map:

| Variable | Where it goes | Notes |
| --- | --- | --- |
| `MONGODB_URI` | `server/.env` | Database only. Never send this to the browser. |
| `PORT` | `server/.env` | API port. Default `5000`. |
| `CLIENT_URL` | `server/.env` | Allowed CORS origin(s), comma-separated. |
| `WEBINAR_URL` | `client/.env` as `VITE_WEBINAR_URL` | Public booking link. Leave empty until live. |
| `WORKSHOP_URL` | `client/.env` as `VITE_WORKSHOP_URL` | Public booking link. Leave empty until live. |

The frontend must not receive MongoDB URIs, email credentials, or API keys. Only `VITE_` variables are bundled into the client.

## Local development

Terminal 1 — API:

```bash
cd server
npm install
npm run dev
```

The API listens on `http://localhost:5000`. Health check: `GET /api/health`.

Terminal 2 — site:

```bash
cd client
npm install
npm run dev
```

Vite runs at `http://localhost:5173` and proxies `/api` to the server.

Optional: generate compressed logo/font copies after replacing the source logo:

```bash
cd client
npm run optimize:assets
```

## Production notes

- Set `NODE_ENV=production` on the server.
- Set `MONGODB_URI` and `CLIENT_URL` to the real values (no localhost).
- Set `TRUST_PROXY=true` only if a reverse proxy (nginx, load balancer) sits in front of Node.
- Enquiry posts are rate-limited, validated, and sanitised. Duplicate submits from the same email and phone within ten minutes are ignored.
- Stack traces are not returned to clients in production.
- JSON bodies are capped (default 16kb).
- Logs are JSON lines (`request`, `enquiry_created`, errors). They do not include form fields, the MongoDB URI, or secrets.

## Scripts

| Location | Command | Purpose |
| --- | --- | --- |
| `server/` | `npm run dev` | API with reload |
| `server/` | `npm start` | API |
| `client/` | `npm run dev` | Vite dev server |
| `client/` | `npm run build` | Production frontend build |
| `client/` | `npm run preview` | Preview the production build |
