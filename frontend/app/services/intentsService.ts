import { getWallet } from './walletService';

const SOLVER_RELAY_URL = 'https://solver-relay-v2.chaindefuser.com/rpc';
const INTENTS_CONTRACT = 'intents.near';

export interface QuoteParams {
  defuse_asset_identifier_in: string;
  defuse_asset_identifier_out: string;
  exact_amount_in?: string;
  exact_amount_out?: string;
  min_deadline_ms?: number;
}

export interface Quote {
  quote_id: string;
  solver_id: string;
  amount_in: string;
  amount_out: string;
  fee: string;
  price_impact: string;
  quote_hash: string;
}

export interface QuoteResponse {
  quotes: Quote[];
}

export interface IntentDeadline {
  timestamp: number;
}

export interface TokenDiff {
  [assetId: string]: string;
}

export interface Intent {
  intent: string;
  diff: TokenDiff;
}

export interface IntentMessage {
  signer_id: string;
  deadline: IntentDeadline;
  intents: Intent[];
}

export interface SignedData {
  standard: string;
  message: IntentMessage;
  nonce: string;
  recipient: string;
  signature: string;
  public_key: string;
}

export interface PublishIntentParams {
  quote_hashes: string[];
  signed_data: SignedData;
}

export interface PublishResponse {
  status: string;
  transaction_hashes?: string[];
}

// Get quotes for a swap intent
export const getQuote = async (params: QuoteParams): Promise<QuoteResponse> => {
  try {
    const response = await fetch(SOLVER_RELAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method: 'quote',
        params: [params],
      }),
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    return data.result;
  } catch (error) {
    console.error('Error getting quotes:', error);
    throw error;
  }
};

// Execute a swap with signed intent
export const executeSwap = async (intent: IntentMessage, quoteHash: string): Promise<PublishResponse> => {
  try {
    const wallet = await getWallet();
    
    // Serialize the intent as a message
    const message = JSON.stringify(intent);
    
    // Generate a unique nonce
    const nonce = generateRandomNonce();
    
    // Create payload for signing
    const payload = {
      message,
      nonce,
      recipient: INTENTS_CONTRACT,
    };
    
    // Sign the message with the NEAR wallet
    const { signature, publicKey } = await wallet.signMessage({
      message: serializeIntentForSigning(message, INTENTS_CONTRACT, nonce),
      receiver: INTENTS_CONTRACT,
    });
    
    // Submit the signed intent to the solver relay
    const response = await fetch(SOLVER_RELAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method: 'publish_intent',
        params: [{
          quote_hashes: [quoteHash],
          signed_data: {
            standard: 'nep413',
            message: intent,
            nonce,
            recipient: INTENTS_CONTRACT,
            signature: `ed25519:${signature}`,
            public_key: `ed25519:${publicKey}`,
          },
        }],
      }),
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    return data.result;
  } catch (error) {
    console.error('Error executing swap:', error);
    throw error;
  }
};

// Generate a random nonce for intent signing
const generateRandomNonce = (): string => {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, Array.from(array)));
};

// Serialize intent for signing (simplified version)
const serializeIntentForSigning = (message: string, recipient: string, nonce: string): Uint8Array => {
  // In a production environment, use a proper serialization library
  // like borsh or near-api-js for accurate serialization
  const data = `${message}:${recipient}:${nonce}`;
  return new TextEncoder().encode(data);
}; 