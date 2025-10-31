# AI Agent Forge

Co-create, train, and deploy personalized AI agents for Farcaster on Base.

## Features

- **Personalized Agent Identity**: Create AI agents linked to your Farcaster profile
- **Collaborative Training**: Communities can collectively build shared AI agents
- **Frame-Native Actions**: Agents interact directly in Farcaster Frames
- **Reputation System**: Earn onchain badges for valuable agent services

## Tech Stack

- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS
- OnchainKit (Base integration)
- Farcaster MiniKit
- Base blockchain (L2)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` from `.env.local.example`:
```bash
cp .env.local.example .env.local
```

3. Add your OnchainKit API key to `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx            # Home page
├── providers.tsx       # OnchainKit & React Query providers
├── create/             # Agent creation flow
├── dashboard/          # Agent management dashboard
└── globals.css         # Global styles with Coinbase theme

components/             # Reusable components
public/
└── .well-known/
    └── farcaster.json  # Farcaster manifest
```

## Base Mini App Integration

This app is built as a Base Mini App with:
- Farcaster identity integration via MiniKit
- OnchainKit components for wallet and transactions
- Gas-sponsored transactions via Paymaster
- Frame-native interactions
- Onchain reputation system

## License

MIT
