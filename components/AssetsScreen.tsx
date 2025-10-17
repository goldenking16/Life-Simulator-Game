import React, { useState } from 'react';
import type { Character, Asset } from '../types';

interface AssetsScreenProps {
    character: Character;
    onSellAsset: (assetId: string) => void;
    onNavigateToRealEstate: () => void;
    onNavigateToInvestments: () => void;
    onBack: () => void;
}

const ShoppingCard: React.FC<{ title: string; icon: string; onClick?: () => void; disabled?: boolean }> = ({ title, icon, onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="bg-stone-100 hover:bg-yellow-100 border-2 border-stone-200 hover:border-yellow-400 p-4 rounded-lg transition flex flex-col items-center justify-center space-y-2 h-32 disabled:bg-stone-50 disabled:cursor-not-allowed disabled:hover:border-stone-200"
    >
        <span className="text-4xl">{icon}</span>
        <span className="font-bold text-stone-700 text-center">{title}</span>
        {disabled && <span className="text-xs text-stone-400">(Coming Soon)</span>}
    </button>
);


const AssetsScreen: React.FC<AssetsScreenProps> = ({ character, onSellAsset, onNavigateToRealEstate, onNavigateToInvestments, onBack }) => {
    const [activeTab, setActiveTab] = useState<'owned' | 'rented'>('owned');

    const ownedAssets = character.assets.filter(a => !a.isRented);
    const rentedAssets = character.assets.filter(a => a.isRented);

    const renderAssetList = (assets: Asset[]) => {
        if (assets.length === 0) {
            return <p className="text-stone-500 mt-4 text-center">You have no assets in this category.</p>;
        }
        return (
            <div className="space-y-3 mt-4 max-h-[30vh] overflow-y-auto pr-2">
                {assets.map((asset) => (
                    <div key={asset.id} className="bg-stone-100 p-4 rounded-lg flex justify-between items-center border border-stone-200">
                        <div>
                            <h3 className="font-bold text-lg text-green-700">{asset.name}</h3>
                            <p className="text-sm text-stone-500">{asset.description}</p>
                            {asset.isRented ? (
                                <p className="font-semibold text-stone-800 mt-1">Rent: {character.currency.symbol}{asset.monthlyCost.toLocaleString()}/month</p>
                            ) : (
                                <>
                                    <p className="font-semibold text-stone-800 mt-1">Market Value: {character.currency.symbol}{asset.marketValue.toLocaleString()}</p>
                                    <p className="text-xs text-stone-500">Upkeep: {character.currency.symbol}{asset.monthlyCost.toLocaleString()}/month</p>
                                </>
                            )}
                        </div>
                        {!asset.isRented && (
                             <button
                                onClick={() => onSellAsset(asset.id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition whitespace-nowrap ml-4 shadow-sm"
                            >
                                Sell
                            </button>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
         <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-2xl relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition">&larr; Back to Game</button>
                <h1 className="text-3xl font-extrabold text-stone-800 mb-6 text-center mt-8">Assets & Shopping</h1>

                <div className="border-b border-stone-200 mb-4">
                    <nav className="flex space-x-4" aria-label="Tabs">
                        <button onClick={() => setActiveTab('owned')} className={`${activeTab === 'owned' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'} whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition`}>
                            Owned
                        </button>
                        <button onClick={() => setActiveTab('rented')} className={`${activeTab === 'rented' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'} whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition`}>
                            Rented & Liabilities
                        </button>
                    </nav>
                </div>
                
                <div>
                    {activeTab === 'owned' && renderAssetList(ownedAssets)}
                    {activeTab === 'rented' && renderAssetList(rentedAssets)}
                </div>

                <div className="mt-8 border-t pt-6 text-center">
                    <h2 className="text-2xl font-bold text-stone-700 mb-4">Go Shopping</h2>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <ShoppingCard title="Real Estate" icon="🏘️" onClick={onNavigateToRealEstate} />
                        <ShoppingCard title="Investments" icon="📈" onClick={onNavigateToInvestments} />
                        <ShoppingCard title="Cars" icon="🚗" disabled />
                        <ShoppingCard title="Jewelry" icon="💎" disabled />
                     </div>
                </div>

            </div>
        </div>
    );
};

export default AssetsScreen;