import React, { useState } from 'react';
import type { Character } from '../types';
import { getMarketData, getMarketHealth } from '../data/services/gameService';

interface InvestmentMarketScreenProps {
    character: Character;
    marketType: 'stocks' | 'crypto';
    onBuyInvestment: (investment: { type: 'Stock' | 'Crypto', name: string, symbol: string, price: number, shares: number }) => void;
    onBack: () => void;
}

type MarketAsset = { name: string; symbol: string; price: number; };

const MarketHealthBar: React.FC = () => {
    const health = React.useMemo(() => getMarketHealth(), []);
     const getColor = (val: number) => {
        if (val > 66) return 'bg-green-500';
        if (val > 33) return 'bg-yellow-400';
        return 'bg-red-500';
    };
    return (
        <div className="w-full mb-4">
            <div className="flex justify-between text-sm font-bold text-stone-600 mb-1">
                <span>Market Health</span>
                <span>{health < 33 ? 'Poor' : health < 66 ? 'Average' : 'Excellent'}</span>
            </div>
            <div className="h-3 bg-stone-200 rounded-full">
                <div
                    className={`${getColor(health)} h-3 rounded-full`}
                    style={{ width: `${health}%` }}
                ></div>
            </div>
        </div>
    );
};


const InvestmentMarketScreen: React.FC<InvestmentMarketScreenProps> = ({ character, marketType, onBuyInvestment, onBack }) => {
    const [actionAsset, setActionAsset] = useState<MarketAsset | null>(null);
    const [sharesAmount, setSharesAmount] = useState('');
    const isUnderage = character.age < 18 * 12;
    
    const marketData = getMarketData(character);
    const assets = marketType === 'stocks' ? marketData.stocks : marketData.crypto;
    const title = marketType === 'stocks' ? 'Stock Market' : 'Cryptocurrency';

    const handleBuy = () => {
        if (!actionAsset) return;
        const amount = parseFloat(sharesAmount);
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        onBuyInvestment({
            type: marketType === 'stocks' ? 'Stock' : 'Crypto',
            name: actionAsset.name,
            symbol: actionAsset.symbol,
            price: actionAsset.price,
            shares: amount,
        });
        
        setActionAsset(null);
        setSharesAmount('');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-2xl bg-stone-50 p-6 rounded-lg shadow-2xl relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition z-10">&larr; Back to Investments</button>
                <h1 className="text-3xl font-extrabold text-stone-800 mb-4 text-center mt-6">{title}</h1>
                <MarketHealthBar />
                 <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 animate-fade-in">
                    {isUnderage && <p className="text-center text-red-600 bg-red-100 p-2 rounded-md">You must be 18 years old to invest.</p>}
                    {assets.map(asset => (
                        <div key={asset.symbol} className="bg-white p-3 rounded-lg border flex justify-between items-center">
                            <div>
                                <h4 className="font-bold">{asset.name} ({asset.symbol})</h4>
                                <p className="font-semibold">Price: {character.currency.symbol}{asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            </div>
                             <button disabled={isUnderage} onClick={() => setActionAsset(asset)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition shadow-sm disabled:bg-green-300 disabled:cursor-not-allowed">Buy</button>
                        </div>
                    ))}
                </div>
            </div>

            {actionAsset && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-20 p-4 animate-fade-in">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
                        <h2 className="text-2xl font-bold mb-4 capitalize">Buy {actionAsset.symbol}</h2>
                        <p className="mb-1 text-stone-600">Price: {character.currency.symbol}{actionAsset.price.toLocaleString()}</p>
                        <p className="mb-4 text-stone-600">Bank Balance: {character.currency.symbol}{character.bankBalance.toLocaleString()}</p>
                        <input
                            type="number"
                            value={sharesAmount}
                            onChange={(e) => setSharesAmount(e.target.value)}
                            placeholder="Enter number of shares"
                            className="w-full bg-stone-100 p-3 rounded text-stone-800 text-center border border-stone-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none mb-4"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => { setActionAsset(null); setSharesAmount(''); }} className="bg-stone-400 hover:bg-stone-500 text-white font-bold py-3 rounded-lg transition">Cancel</button>
                            <button onClick={handleBuy} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvestmentMarketScreen;