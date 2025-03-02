# RunesDex NEAR Intents Integration

This project integrates RunesDex with the NEAR Intents protocol, enabling seamless token swaps between NEAR and Bitcoin Ordinals/Runes.

## Project Structure

The project consists of two main components:

1. **RunesDex Solver** - A Rust-based solver that connects to the NEAR Intents protocol and executes swaps via RunesDex
2. **Frontend** - A Next.js web application that provides a user interface for swapping tokens

## Getting Started

### Prerequisites

- Rust 1.70+ and Cargo
- Node.js 18+ and npm/yarn
- NEAR account with access to the Intents protocol
- RunesDex API key

### Setting up the Solver

1. Navigate to the solver directory:
   ```
   cd runesdex-solver
   ```

2. Set up environment variables:
   ```
   export RUNESDEX_API_KEY=your_api_key
   export NEAR_ACCOUNT_ID=your_near_account.near
   export NEAR_PRIVATE_KEY=your_private_key
   export SOLVER_BUS_URL=wss://solver-relay-v2.chaindefuser.com/ws
   ```

3. Build and run the solver:
   ```
   cargo run --release
   ```

### Setting up the Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- Swap between NEAR tokens and Bitcoin Ordinals/Runes
- Real-time price quotes from RunesDex
- Seamless integration with NEAR wallet
- Secure transaction signing via NEAR Intents protocol

## Architecture

The system works as follows:

1. User initiates a swap on the frontend
2. Frontend requests quotes from the NEAR Intents protocol
3. RunesDex solver provides quotes for the requested swap
4. User signs the intent with their NEAR wallet
5. Solver executes the swap on RunesDex
6. Tokens are transferred to the user's wallet

## License

MIT 