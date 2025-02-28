'use client';

import React, { useState, useEffect } from 'react';
import { getQuote, executeSwap } from '../services/intentsService';
import { TokenSelector } from '../components/TokenSelector';
import { QuoteDisplay } from '../components/QuoteDisplay';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { supportedTokens } from '../config/tokens';
import { getWallet } from '../services/walletService';

export default function SwapPage() {
  const [wallet, setWallet] = useState<any>(null);
  const [fromToken, setFromToken] = useState(supportedTokens[0]);
  const [toToken, setToToken] = useState(supportedTokens[1]);
  const [amount, setAmount] = useState('');
  const [quotes, setQuotes] = useState<any[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [swapStatus, setSwapStatus] = useState('');

  // Initialize wallet
  useEffect(() => {
    const initializeWallet = async () => {
      const walletInstance = await getWallet();
      setWallet(walletInstance);
    };
    
    initializeWallet();
  }, []);

  // Swap token positions
  const switchTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setQuotes([]);
    setSelectedQuote(null);
  };

  // Get quotes when inputs change
  useEffect(() => {
    if (!amount || parseFloat(amount) <= 0 || !fromToken || !toToken) {
      setQuotes([]);
      return;
    }

    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const quoteRequest = {
          defuse_asset_identifier_in: `${fromToken.chain}:${fromToken.id}`,
          defuse_asset_identifier_out: `${toToken.chain}:${toToken.id}`,
          exact_amount_in: convertAmountToBaseUnits(amount, fromToken.decimals),
        };
        
        const quotesResponse = await getQuote(quoteRequest);
        setQuotes(quotesResponse.quotes || []);
        
        // Auto-select the best quote
        if (quotesResponse.quotes?.length > 0) {
          setSelectedQuote(quotesResponse.quotes[0]);
        }
      } catch (error) {
        console.error('Error fetching quotes:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchQuotes, 500);
    return () => clearTimeout(debounceTimer);
  }, [fromToken, toToken, amount]);

  // Execute the swap
  const handleSwap = async () => {
    if (!selectedQuote || !wallet?.accountId) {
      if (!wallet?.accountId) {
        wallet?.signIn();
      }
      return;
    }
    
    setSwapStatus('pending');
    try {
      // Request signature from the wallet
      const intent = {
        signer_id: wallet.accountId,
        deadline: {
          timestamp: Math.floor(Date.now() / 1000) + 600, // 10 minutes from now
        },
        intents: [
          {
            intent: 'token_diff',
            diff: {
              [`${fromToken.chain}:${fromToken.id}`]: `-${selectedQuote.amount_in}`,
              [`${toToken.chain}:${toToken.id}`]: selectedQuote.amount_out,
            },
          },
        ],
      };
      
      // Sign and submit the intent
      const result = await executeSwap(intent, selectedQuote.quote_hash);
      
      if (result.status === 'OK') {
        setSwapStatus('success');
      } else {
        setSwapStatus('failed');
      }
    } catch (error) {
      console.error('Error executing swap:', error);
      setSwapStatus('failed');
    }
  };

  // Helper to convert amount to base units based on token decimals
  const convertAmountToBaseUnits = (value: string, decimals: number): string => {
    return (parseFloat(value) * (10 ** decimals)).toString();
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="p-6 shadow-lg rounded-xl bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6">Swap</h2>
        
        {/* From token section */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">From</label>
          <div className="flex items-center">
            <TokenSelector 
              selectedToken={fromToken}
              onSelectToken={setFromToken}
              tokens={supportedTokens.filter(t => t.id !== toToken.id)}
            />
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="ml-2 flex-grow"
            />
          </div>
        </div>
        
        {/* Swap direction button */}
        <div className="flex justify-center my-4">
          <Button variant="outline" onClick={switchTokens} className="rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 10l5 5 5-5"/>
              <path d="M7 14l5-5 5 5"/>
            </svg>
          </Button>
        </div>
        
        {/* To token section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">To</label>
          <div className="flex items-center">
            <TokenSelector 
              selectedToken={toToken}
              onSelectToken={setToToken}
              tokens={supportedTokens.filter(t => t.id !== fromToken.id)}
            />
            <div className="ml-2 flex-grow p-2 bg-gray-100 dark:bg-gray-700 rounded">
              {loading ? (
                <div className="animate-spin w-5 h-5 border-t-2 border-gray-500 rounded-full mx-auto"></div>
              ) : (
                selectedQuote ? (
                  <span>
                    {(parseFloat(selectedQuote.amount_out) / (10 ** toToken.decimals)).toFixed(6)}
                  </span>
                ) : (
                  <span className="text-gray-500">0.0</span>
                )
              )}
            </div>
          </div>
        </div>
        
        {/* Quote display */}
        {selectedQuote && (
          <QuoteDisplay 
            quote={selectedQuote}
            fromToken={fromToken}
            toToken={toToken}
          />
        )}
        
        {/* Action button */}
        <Button 
          onClick={handleSwap}
          disabled={!selectedQuote || loading || swapStatus === 'pending'}
          className="w-full mt-4"
        >
          {!wallet?.accountId ? 'Connect Wallet' : 
           swapStatus === 'pending' ? 'Processing...' :
           swapStatus === 'success' ? 'Swap Successful' :
           swapStatus === 'failed' ? 'Swap Failed, Try Again' :
           'Swap'}
        </Button>
        
        {/* Status message */}
        {swapStatus === 'success' && (
          <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
            Swap completed successfully!
          </div>
        )}
        {swapStatus === 'failed' && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
            Swap failed. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}