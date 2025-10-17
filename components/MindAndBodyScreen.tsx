import React from 'react';
import type { Character } from '../types';

interface MindAndBodyScreenProps {
    character: Character;
    onActivity: (activity: string) => void;
    onBack: () => void;
}

const mindAndBodyActivities = [
    { id: 'singing', name: 'Singing Lessons', description: 'Take voice lessons', icon: '🎤', minAge: 8 * 12 },
    { id: 'space_camp', name: 'Space Camp', description: 'Go to space camp', icon: '🚀', minAge: 10 * 12 },
    { id: 'modeling', name: 'Modeling Lessons', description: 'Take modeling lessons', icon: '💃', minAge: 14 * 12 },
    { id: 'acting', name: 'Acting Lessons', description: 'Take acting lessons', icon: '🎭', minAge: 8 * 12 },
    { id: 'book', name: 'Book', description: 'Read a book', icon: '📖', minAge: 6 * 12 },
    { id: 'diet', name: 'Diet', description: 'Go on a diet', icon: '🥗', minAge: 13 * 12 },
    { id: 'garden', name: 'Garden', description: 'Take care of your garden', icon: '🌱', minAge: 8 * 12 },
    { id: 'gym', name: 'Gym', description: 'Do some workout', icon: '💪', minAge: 14 * 12 },
    { id: 'instrument', name: 'Instruments', description: 'Practice an instrument', icon: '🎸', minAge: 6 * 12 },
    { id: 'library', name: 'Library', description: 'Go to the library', icon: '🏛️', minAge: 4 * 12 },
    { id: 'meditate', name: 'Meditate', description: 'Practice meditation', icon: '🧘', minAge: 12 * 12 },
    { id: 'martial_arts', name: 'Martial Arts', description: 'Practice a martial art', icon: '🥋', minAge: 6 * 12 },
    { id: 'cinema', name: 'Cinema', description: 'Go watch a movie', icon: '🎬', minAge: 4 * 12 },
];

const MindAndBodyScreen: React.FC<MindAndBodyScreenProps> = ({ character, onActivity, onBack }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-2xl relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition">&larr; Back to Activities</button>
                <h1 className="text-3xl font-extrabold text-stone-800 mb-6 text-center mt-8">Mind & Body</h1>
                
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                    {mindAndBodyActivities.map(activity => {
                        const isDiet = activity.id === 'diet';
                        const dietText = character.isOnDiet ? 'Manage your diet' : 'Go on a diet';
                        const isDisabled = activity.minAge && character.age < activity.minAge;
                        const title = isDisabled ? `You must be ${Math.floor(activity.minAge / 12)} years old.` : '';
                        
                        return (
                            <button 
                                key={activity.id}
                                onClick={() => onActivity(activity.id)}
                                disabled={isDisabled}
                                title={title}
                                className="w-full bg-stone-100 hover:bg-yellow-100 border-2 border-stone-200 hover:border-yellow-400 p-4 rounded-lg transition flex items-center space-x-4 text-left disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-stone-100 disabled:hover:border-stone-200"
                            >
                                <span className="text-4xl">{activity.icon}</span>
                                <div className="flex-grow">
                                    <h2 className="font-bold text-lg text-stone-800">{activity.name}</h2>
                                    <p className="text-sm text-stone-500">
                                        {isDiet ? dietText : activity.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MindAndBodyScreen;