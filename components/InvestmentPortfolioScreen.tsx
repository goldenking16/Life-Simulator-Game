import React, { useState } from 'react';
import type { Character, Investment } from '../types';

interface InvestmentPortfolioScreenProps {
    character: Character;
    onSellInvestment: (investmentId: string, sharesToSell: number) => void;
    onBack: () => void;
}

const InvestmentPortfolioScreen: React.FC<InvestmentPortfolioScreenProps> = ({ character, onSellInvestment, onBack }) => {
    const [actionInvestment, setActionInvestment] = useState<Investment | null>(null);
    const [sharesAmount, setSharesAmount] = useState('');

    const totalValue = character.investments.reduce((sum, inv) => sum + (inv.shares * inv.currentValuePerShare), 0);
    const totalCost = character.investments.reduce((sum, inv) => sum + (inv.shares * inv.purchasePricePerShare), 0);
    const totalGainLoss = totalValue - totalCost;
    const gainLossColor = totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600';

    const handleSell = () => {
        if (!actionInvestment) return;
        const amount = parseFloat(sharesAmount);
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }
        if (amount > actionInvestment.shares) {
            alert("You don't own that many shares.");
            return;
        }

        onSellInvestment(actionInvestment.id, amount);
        setActionInvestment(null);
        setSharesAmount('');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-2xl bg-stone-50 p-6 rounded-lg shadow-2xl relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition z-10">&larr; Back to Investments</button>
                <h1 className="text-3xl font-extrabold text-stone-800 mb-4 text-center mt-6">Your Portfolio</h1>
                
                <div className="bg-stone-100 p-4 rounded-lg mb-4 text-center">
                    <h3 className="text-stone-500 font-bold">Total Portfolio Value</h3>
                    <p className="text-3xl font-extrabold text-blue-600">{character.currency.symbol}{totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <p className={`font-semibold ${gainLossColor}`}>
                        {totalGainLoss >= 0 ? '▲' : '▼'} {character.currency.symbol}{Math.abs(totalGainLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>

                {character.investments.length === 0 ? (
                    <p className="text-center text-stone-500 py-8">You do not own any investments.</p>
                ) : (
                    <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2">
                        {character.investments.map(inv => {
                            const value = inv.shares * inv.currentValuePerShare;
                            const gainLoss = value - (inv.shares * inv.purchasePricePerShare);
                            const glColor = gainLoss >= 0 ? 'text-green-600' : 'text-red-600';

                            return (
                                <div key={inv.id} className="bg-white p-3 rounded-lg border flex justify-between items-center">
                                    <div>
                                        <h4 className="font-bold">{inv.name} ({inv.symbol})</h4>
                                        <p className="text-sm text-stone-600">{inv.shares.toLocaleString()} shares @ {character.currency.symbol}{inv.currentValuePerShare.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                        <p className="font-semibold">Value: {character.currency.symbol}{value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className={`text-xs ${glColor}`}>({gainLoss >= 0 ? '+' : ''}{gainLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</span></p>
                                    </div>
                                    <button onClick={() => setActionInvestment(inv)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition shadow-sm">Sell</button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {actionInvestment && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-20 p-4 animate-fade-in">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
                        <h2 className="text-2xl font-bold mb-4 capitalize">Sell {actionInvestment.symbol}</h2>
                        <p className="mb-4 text-stone-600">You own {actionInvestment.shares.toLocaleString()} shares.</p>
                        <input
                            type="number"
                            value={sharesAmount}
                            onChange={(e) => setSharesAmount(e.target.value)}
                            placeholder="Enter number of shares"
                            className="w-full bg-stone-100 p-3 rounded text-stone-800 text-center border border-stone-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none mb-4"
                        />
                         <button onClick={() => setSharesAmount(actionInvestment.shares.toString())} className="text-sm text-blue-600 hover:text-blue-500 mb-4">Sell Max</button>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => { setActionInvestment(null); setSharesAmount(''); }} className="bg-stone-400 hover:bg-stone-500 text-white font-bold py-3 rounded-lg transition">Cancel</button>
                            <button onClick={handleSell} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvestmentPortfolioScreen;
