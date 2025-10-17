import React from 'react';
import type { Character, Asset } from '../types';
import { getAvailableRealEstate } from '../data/services/gameService';

interface RealEstateScreenProps {
    character: Character;
    onPurchaseAsset: (asset: Omit<Asset, 'id'>) => void;
    onBack: () => void;
}

const RealEstateScreen: React.FC<RealEstateScreenProps> = ({ character, onPurchaseAsset, onBack }) => {
    const { listings } = getAvailableRealEstate(character);
    const isUnderage = character.age < 18 * 12;
    
    const handlePurchase = (listing: any) => {
        const asset: Omit<Asset, 'id'> = {
            type: 'House',
            name: listing.name,
            description: listing.description,
            purchasePrice: listing.purchasePrice,
            marketValue: listing.marketValue,
            monthlyCost: listing.monthlyCost,
            isRented: listing.isRented,
        };
        onPurchaseAsset(asset);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-2xl relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition">&larr; Back to Assets</button>
                <h1 className="text-3xl font-extrabold text-stone-800 mb-6 text-center mt-8">Real Estate Market</h1>
                
                <div className="space-y-3 mt-4 max-h-[60vh] overflow-y-auto pr-2">
                    {isUnderage && <p className="text-center text-red-600 bg-red-100 p-2 rounded-md">You must be 18 years old to buy or rent property.</p>}
                    {listings.length === 0 && <p className="text-stone-500 mt-4 text-center">No properties on the market right now.</p>}
                    {listings.map((listing, index) => (
                        <div key={index} className="bg-stone-100 p-4 rounded-lg flex justify-between items-center border border-stone-200">
                            <div>
                                <h3 className="font-bold text-lg text-green-700">{listing.name}</h3>
                                <p className="text-sm text-stone-500">{listing.description}</p>
                                {listing.isRented ? (
                                    <p className="font-semibold text-stone-800 mt-1">Rent: {character.currency.symbol}{listing.monthlyCost.toLocaleString()}/month</p>
                                ) : (
                                    <p className="font-semibold text-stone-800 mt-1">Price: {character.currency.symbol}{listing.purchasePrice.toLocaleString()}</p>
                                )}
                            </div>
                            <button
                                onClick={() => handlePurchase(listing)}
                                disabled={isUnderage || (!listing.isRented && character.bankBalance < listing.purchasePrice)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition whitespace-nowrap ml-4 shadow-sm disabled:bg-yellow-300 disabled:cursor-not-allowed"
                                title={isUnderage ? "Must be 18 to transact" : (!listing.isRented && character.bankBalance < listing.purchasePrice) ? "Not enough funds in bank" : ""}
                            >
                                {listing.isRented ? 'Rent' : 'Buy'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RealEstateScreen;