import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import Image from 'next/image';

interface Token {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  chain: string;
  decimals: number;
}

interface TokenSelectorProps {
  selectedToken: Token;
  onSelectToken: (token: Token) => void;
  tokens: Token[];
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  onSelectToken,
  tokens,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="flex items-center gap-2 p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image 
          src={selectedToken.logo} 
          alt={selectedToken.symbol} 
          width={24} 
          height={24} 
          className="rounded-full"
        />
        <span>{selectedToken.symbol}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 z-10 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {tokens.map((token) => (
              <button
                key={token.id}
                className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  onSelectToken(token);
                  setIsOpen(false);
                }}
              >
                <Image 
                  src={token.logo} 
                  alt={token.symbol} 
                  width={24} 
                  height={24} 
                  className="rounded-full"
                />
                <span>{token.symbol}</span>
                <span className="text-gray-500 text-xs ml-auto">{token.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 