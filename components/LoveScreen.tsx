import React from 'react';
import type { Character } from '../types';

interface LoveScreenProps {
    character: Character;
    onBack: () => void;
}

const loveOptions = [
    { name: 'Celebrity Dating App', description: 'Date the celebrity of your choice', icon: '🌟', minAge: 18 * 12 },
    { name: 'Date', description: 'Find a date', icon: '💕', minAge: 16 * 12 },
    { name: 'Dating App', description: 'Find a partner from a dating app', icon: '📱', minAge: 18 * 12 },
    { name: 'Hook Up', description: 'Find a one night stand', icon: '🔥', minAge: 18 * 12 },
    { name: 'Mail-Order Bride', description: 'Order the bride of your dreams', icon: '💌', minAge: 18 * 12 },
    { name: 'Threesome', description: 'Setup a threesome', icon: '🤫', minAge: 18 * 12 },
];

const LoveScreen: React.FC<LoveScreenProps> = ({ character, onBack }) => {

    const handleOptionClick = (optionName: string) => {
        alert(`${optionName} functionality is coming soon!`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-2xl relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition">&larr; Back to Activities</button>
                <h1 className="text-3xl font-extrabold text-stone-800 mb-6 text-center mt-8">Love</h1>
                
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                    {loveOptions.map(option => {
                        const isDisabled = option.minAge && character.age < option.minAge;
                        const title = isDisabled ? `You must be ${Math.floor(option.minAge / 12)} years old.` : '';
                        
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
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LoveScreen;