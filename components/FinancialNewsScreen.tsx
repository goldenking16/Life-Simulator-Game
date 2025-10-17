import React from 'react';
import { getFinancialNews } from '../data/services/gameService';

interface FinancialNewsScreenProps {
    onBack: () => void;
}

const FinancialNewsScreen: React.FC<FinancialNewsScreenProps> = ({ onBack }) => {
    const news = getFinancialNews();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-2xl relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition">&larr; Back to Investments</button>
                <h1 className="text-3xl font-extrabold text-stone-800 mb-6 text-center mt-8">Financial News</h1>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {news.map((item, index) => (
                        <div key={index} className="bg-stone-100 p-4 rounded-lg border border-stone-200 animate-fade-in">
                            <h2 className="font-bold text-lg text-blue-700">{item.headline}</h2>
                            <p className="text-stone-600 mt-1">{item.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FinancialNewsScreen;