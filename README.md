# CryptoTrace – Blockchain Intelligence & VASP Attribution Platform

CryptoTrace is a frontend platform concept for authorized Law Enforcement Agencies (LEAs) to investigate suspicious cryptocurrency wallet addresses, visualize transaction activity, organize cases, and support VASP attribution workflows.

> **Current status:** Frontend prototype. The application currently uses local/mock data. Backend APIs, live blockchain intelligence providers, authentication, and production data integrations can be connected later through the existing service layer.

## Features

- Wallet investigation dashboard
- Transaction and transaction-flow visualization
- VASP attribution and intelligence views
- Risk analysis and alerts
- Cross-chain analysis UI
- Case management
- Investigation report UI
- Multi-blockchain interface
- API integration management UI
- Lawful-request / Sahyog integration UI

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Motion
- React Flow (`@xyflow/react`)

## Project Structure

```text
src/
├── components/       # UI components and application views
├── context/          # Shared application context
├── data/             # Current mock/demo data
├── services/         # Service abstraction layer for future APIs
├── types/            # TypeScript types
├── App.tsx
├── index.css
└── main.tsx
```

## Run Locally

### Prerequisites

- Node.js 20+ recommended
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the local URL shown by Vite (normally `http://localhost:3000`).

### Check TypeScript

```bash
npm run lint
```

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Environment Variables

The current frontend-only prototype does not require production API credentials. When the backend is added, document frontend-safe variables in `.env.example` and use `.env.local` for local values.

**Never commit real API keys, passwords, private keys, or other secrets to GitHub.**

## Backend Integration Plan

The frontend is intentionally separated from the future backend. The existing `src/services/` layer can be connected to backend endpoints later.

```text
React Frontend
      ↓
src/services/
      ↓
CryptoTrace Backend API
      ↓
Blockchain Intelligence Providers
      ↓
Wallet / Transaction / VASP Analysis
      ↓
Structured API Response
      ↓
React Frontend
```

Planned backend capabilities include secure authentication, wallet/address analysis, blockchain API integrations, transaction graph retrieval, VASP intelligence integrations, risk/alert processing, investigation persistence, report generation, and audit logging.

## Important Data Notice

The current application contains mock/demo data for UI development and demonstration. It should not be treated as real investigative intelligence or as evidence of an actual VASP relationship.

Live blockchain and VASP information should be obtained only from authorized, reliable data sources and handled according to applicable laws, policies, and organizational procedures.

## GitHub

```bash
git init
git add .
git commit -m "Initial CryptoTrace frontend"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the repository URL with your own GitHub repository URL.

## Roadmap

- [ ] Connect frontend services to backend APIs
- [ ] Add secure authentication and role-based access
- [ ] Add real blockchain intelligence integrations
- [ ] Add VASP intelligence provider integrations
- [ ] Persist cases and investigations
- [ ] Add production audit logging
- [ ] Add production deployment configuration

## License

Add the project's license here before public distribution. For a college/hackathon project, confirm the team's preferred license before choosing one.
