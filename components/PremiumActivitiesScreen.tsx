import React from 'react';
import type { Character } from '../types';

interface PremiumActivitiesScreenProps {
    character: Character;
    onBack: () => void;
}

const premiumOptions = [
    { name: 'Outdoor', description: 'Spend time with mother nature', icon: '🌲' },
    { name: 'Luxurious Life', description: 'Enjoy the perks of being VIP', icon: '🥂' },
    { name: 'Casino', description: 'Start your own Casino', icon: '🎰' },
    { name: 'Black Market', description: 'Shop for contraband', icon: '🤫' },
    { name: 'Commune', description: 'Start a Cult', icon: '🧘‍♀️' },
    { name: 'Secret Agent', description: 'Start your own spy agency', icon: '🕵️' },
    { name: 'Zoo', description: 'Purchase a zoo', icon: '🦁' },
];

const PremiumActivitiesScreen: React.FC<PremiumActivitiesScreenProps> = ({ character, onBack }) => {

    const handleOptionClick = (optionName: string) => {
        alert(`${optionName} functionality is a PRO feature!`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-2xl relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition">&larr; Back to Activities</button>
                <h1 className="text-3xl font-extrabold text-stone-800 mb-6 text-center mt-8">Premium Activities</h1>
                
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                    {premiumOptions.map(option => {
                        const isDisabled = true; // All premium activities are disabled
                        const title = 'Unlock this with the PRO version!';
                        
                        return (
                            <button 
                                key={option.name}
                                onClick={() => handleOptionClick(option.name)}
                                disabled={isDisabled}
                                title={title}
                                className="w-full bg-stone-100 hover:bg-yellow-100 border-2 border-stone-200 hover:border-yellow-400 p-4 rounded-lg transition flex items-center space-x-4 text-left disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-stone-100 disabled:hover:border-stone-200"
                            >
                                <span className="text-4xl">{option.icon}</span>
                                <div className="flex-grow">
                                    <h2 className="font-bold text-lg text-stone-800">{option.name}</h2>
                                    <p className="text-sm text-stone-500">{option.description}</p>
                                </div>
                                {isDisabled && <span className="text-xs font-bold text-red-500 bg-red-100/50 px-2 py-1 rounded-full">PRO</span>}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PremiumActivitiesScreen;