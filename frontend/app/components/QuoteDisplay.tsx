import React from 'react';

interface Token {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  chain: string;
  decimals: number;
}

interface Quote {
  quote_id: string;
  solver_id: string;
  amount_in: string;
  amount_out: string;
  fee: string;
  price_impact: string;
  quote_hash: string;
}

interface QuoteDisplayProps {
  quote: Quote;
  fromToken: Token;
  toToken: Token;
}

export const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ 
  quote, 
  fromToken, 
  toToken 
}) => {
  // Calculate display values
  const displayAmountIn = parseFloat(quote.amount_in) / (10 ** fromToken.decimals);
  const displayAmountOut = parseFloat(quote.amount_out) / (10 ** toToken.decimals);
  const rate = displayAmountOut / displayAmountIn;
  const priceImpact = parseFloat(quote.price_impact || '0');
  
  return (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-500">Rate</span>
        <span className="font-medium">
          1 {fromToken.symbol} = {rate.toFixed(6)} {toToken.symbol}
        </span>
      </div>
      
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-500">Price Impact</span>
        <span className={`font-medium ${priceImpact > 1 ? 'text-amber-500' : priceImpact > 3 ? 'text-red-500' : ''}`}>
          {priceImpact.toFixed(2)}%
        </span>
      </div>
      
      {quote.fee && (
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">Fee</span>
          <span className="font-medium">
            {(parseFloat(quote.fee) / (10 ** fromToken.decimals)).toFixed(6)} {fromToken.symbol}
          </span>
        </div>
      )}
      
      <div className="flex justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-500">Provided by</span>
        <span className="text-sm font-medium">
          {quote.solver_id || 'RunesDex'}
        </span>
      </div>
    </div>
  );
}; 