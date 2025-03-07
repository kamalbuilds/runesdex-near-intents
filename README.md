# RunesDex NEAR Intents Integration

![RunesDex NEAR Intents](https://via.placeholder.com/800x200?text=RunesDex+NEAR+Intents)

> Seamlessly swap between NEAR tokens and Bitcoin Ordinals/Runes using the power of NEAR Intents protocol.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setting up the Solver](#setting-up-the-solver)
  - [Setting up the Frontend](#setting-up-the-frontend)
- [Usage Guide](#usage-guide)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

This project integrates RunesDex with the NEAR Intents protocol, enabling seamless token swaps between NEAR and Bitcoin Ordinals/Runes. It provides a decentralized bridge between the NEAR ecosystem and Bitcoin's emerging Runes and Ordinals ecosystem.

The project consists of two main components:

1. **RunesDex Solver** - A Rust-based solver that connects to the NEAR Intents protocol and executes swaps via RunesDex
2. **Frontend** - A Next.js web application that provides a user interface for swapping tokens

## ✨ Features

- **Cross-Chain Swaps**: Swap between NEAR tokens and Bitcoin Ordinals/Runes
- **Real-time Pricing**: Get real-time price quotes from RunesDex
- **Wallet Integration**: Seamless integration with NEAR wallet
- **Secure Transactions**: Secure transaction signing via NEAR Intents protocol
- **Optimized Execution**: Efficient routing and execution of swaps
- **User-Friendly Interface**: Intuitive UI for a smooth user experience

## 🏗️ Architecture

The system works as follows:

```
┌─────────────┐     ┌───────────────┐     ┌─────────────────┐
│   Frontend  │────▶│  NEAR Intents │────▶│  RunesDex Solver│
└─────────────┘     └───────────────┘     └─────────────────┘
       │                                           │
       │                                           ▼
       │                                  ┌─────────────────┐
       │                                  │  RunesDex API   │
       │                                  └─────────────────┘
       │                                           │
       ▼                                           ▼
┌─────────────┐                          ┌─────────────────┐
│ NEAR Wallet │◀─────────────────────────│ Bitcoin Network │
└─────────────┘                          └─────────────────┘
```

1. User initiates a swap on the frontend
2. Frontend requests quotes from the NEAR Intents protocol
3. RunesDex solver provides quotes for the requested swap
4. User signs the intent with their NEAR wallet
5. Solver executes the swap on RunesDex
6. Tokens are transferred to the user's wallet

## 🚀 Getting Started

### Prerequisites

- Rust 1.70+ and Cargo
- Node.js 18+ and npm/yarn
- NEAR account with access to the Intents protocol
- RunesDex API key

### Setting up the Solver

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/runesdex-near-intents.git
   cd runesdex-near-intents
   ```

2. Navigate to the solver directory:
   ```bash
   cd runesdex-solver
   ```

3. Set up environment variables (create a `.env` file or export directly):
   ```bash
   export RUNESDEX_API_KEY=your_api_key
   export NEAR_ACCOUNT_ID=your_near_account.near
   export NEAR_PRIVATE_KEY=your_private_key
   export SOLVER_BUS_URL=wss://solver-relay-v2.chaindefuser.com/ws
   ```

4. Build and run the solver:
   ```bash
   cargo run --release
   ```

### Setting up the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file with the necessary environment variables:
   ```
   NEXT_PUBLIC_NEAR_NETWORK=mainnet
   NEXT_PUBLIC_SOLVER_API_URL=https://your-solver-api-url.com
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage Guide

1. **Connect Wallet**: Click on "Connect Wallet" and authorize your NEAR wallet
2. **Select Tokens**: Choose the tokens you want to swap (NEAR token ↔ Bitcoin Rune/Ordinal)
3. **Enter Amount**: Specify the amount you want to swap
4. **Review Quote**: Check the exchange rate and fees
5. **Confirm Swap**: Approve the transaction in your NEAR wallet
6. **Track Progress**: Monitor the status of your swap in the transaction history

## ❓ Troubleshooting

### Common Issues

- **Solver Connection Error**: Ensure your environment variables are correctly set and the solver is running
- **Transaction Failed**: Check that you have sufficient balance and the network is not congested
- **Price Impact Too High**: Try swapping a smaller amount or wait for better market conditions

### Getting Help

If you encounter any issues, please:
1. Check the existing [issues](https://github.com/yourusername/runesdex-near-intents/issues) on GitHub
2. Join our [Discord community](https://discord.gg/yourlink) for real-time support
3. Reach out to support@runesdex.com for direct assistance

## 🤝 Contributing

We welcome contributions to improve RunesDex NEAR Intents integration! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. 
