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
- React Flow

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

## Important Data Notice

The current application contains mock/demo data for UI development and demonstration. It should not be treated as real investigative intelligence or as evidence of an actual VASP relationship.

Live blockchain and VASP information should be obtained only from authorized, reliable data sources and handled according to applicable laws, policies, and organizational procedures.

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
