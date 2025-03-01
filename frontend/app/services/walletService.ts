import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupSender } from '@near-wallet-selector/sender';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';

let wallet: any = null;
let walletSelector: any = null;
let walletModal: any = null;

export const initWallet = async () => {
  try {
    if (walletSelector !== null) return walletSelector;

    walletSelector = await setupWalletSelector({
      network: 'mainnet',
      modules: [
        setupMyNearWallet(),
        setupSender(),
        setupMeteorWallet(),
      ],
    });

    const isSignedIn = walletSelector.isSignedIn();

    walletModal = setupModal(walletSelector, {
      contractId: 'intents.near',
    });

    wallet = {
      signIn: () => {
        walletModal.show();
      },
      signOut: async () => {
        const wallet = await walletSelector.wallet();
        await wallet.signOut();
        window.location.reload();
      },
      accountId: isSignedIn ? walletSelector.store.getState().accounts[0].accountId : null,
      signMessage: async ({ message, receiver }: { message: Uint8Array, receiver: string }) => {
        const wallet = await walletSelector.wallet();
        
        const signedMessage = await wallet.signMessage({
          message,
          receiver,
        });
        
        return {
          signature: signedMessage.signature,
          publicKey: signedMessage.publicKey,
        };
      },
    };

    return walletSelector;
  } catch (error) {
    console.error('Error initializing wallet:', error);
    throw error;
  }
};

export const getWallet = async () => {
  if (!wallet) {
    await initWallet();
  }
  return wallet;
};

export const signIn = async () => {
  if (!wallet) {
    await initWallet();
  }
  return wallet.signIn();
};

export const signOut = async () => {
  if (!wallet) {
    await initWallet();
  }
  return wallet.signOut();
}; 