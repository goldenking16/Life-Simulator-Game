import React from 'react';
import type { Character } from '../types';

interface InvestmentStatsScreenProps {
    character: Character;
    onBack: () => void;
}

const StatDisplay: React.FC<{ label: string; value: string; className?: string; }> = ({ label, value, className = 'text-green-700' }) => (
    <div className="bg-stone-100 p-4 rounded-lg text-center">
        <p className="text-sm font-bold text-stone-500">{label}</p>
        <p className={`text-2xl font-extrabold ${className}`}>{value}</p>
    </div>
);


const InvestmentStatsScreen: React.FC<InvestmentStatsScreenProps> = ({ character, onBack }) => {
    const { investmentStats } = character;
    const netProfit = investmentStats.totalReturns - investmentStats.totalInvested;
    const ageStartedYears = investmentStats.ageStartedInvesting ? Math.floor(investmentStats.ageStartedInvesting / 12) : 'N/A';
    
    let yearsInvesting = 'N/A';
    if (investmentStats.ageStartedInvesting !== null) {
        yearsInvesting = Math.floor((character.age - investmentStats.ageStartedInvesting) / 12).toString();
    }
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-2xl relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition">&larr; Back to Investments</button>
                <h1 className="text-3xl font-extrabold text-stone-800 mb-6 text-center mt-8">Lifetime Performance</h1>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <StatDisplay 
                        label="Total Invested" 
                        value={`${character.currency.symbol}${investmentStats.totalInvested.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} 
                        className="text-orange-600"
                    />
                     <StatDisplay 
                        label="Total Returns" 
                        value={`${character.currency.symbol}${investmentStats.totalReturns.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
                        className="text-teal-600"
                    />
                    <div className="md:col-span-2">
                        <StatDisplay 
                            label="Net Profit / Loss" 
                            value={`${netProfit >= 0 ? '' : '-'}${character.currency.symbol}${Math.abs(netProfit).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
                            className={netProfit >= 0 ? 'text-green-700' : 'text-red-700'}
                        />
                    </div>
                     <StatDisplay 
                        label="Age Started Investing" 
                        value={ageStartedYears.toString()}
                        className="text-stone-800"
                    />
                     <StatDisplay 
                        label="Years Investing" 
                        value={yearsInvesting}
                        className="text-stone-800"
                    />
                 </div>
            </div>
        </div>
    );
};

export default InvestmentStatsScreen;
