import React from 'react';
import type { Character, NPC } from '../types';

interface GameOverScreenProps {
  finalCharacterState: Character;
  onRestart: () => void;
  heirs: NPC[];
  onContinueAsChild: (childId: string) => void;
}

const StatDisplay: React.FC<{ label: string; value: string | number; }> = ({ label, value }) => (
    <div className="bg-stone-100 p-3 rounded-lg text-center">
        <p className="text-sm font-bold text-stone-500">{label}</p>
        <p className="text-xl font-extrabold text-green-700">{value}</p>
    </div>
);

const GameOverScreen: React.FC<GameOverScreenProps> = ({ finalCharacterState, onRestart, heirs, onContinueAsChild }) => {
    const { name, age, npcs, personality, occupation, jobHistory, educationLevel, jailHistory, happiness, smarts, looks, karma, moral } = finalCharacterState;

    const years = Math.floor(age / 12);

    const generateObituary = () => {
        const genderPronoun = finalCharacterState.gender === 'Male' ? 'He' : 'She';
        const possessivePronoun = finalCharacterState.gender === 'Male' ? 'his' : 'her';

        const goodRelations = npcs.filter(n => n.relationshipStatus > 60);
        const attendees = goodRelations.length > 0
            ? `The funeral was attended by ${possessivePronoun} loving family and friends.`
            : 'The funeral was a somber, sparsely attended affair.';

        const workHistory = jobHistory.map(j => j.title).join(', ');
        const career = occupation !== 'Infant' && occupation !== 'Unemployed'
            ? `${genderPronoun} was known for ${possessivePronoun} ${personality.toLowerCase()} personality at work, where ${possessivePronoun} last worked as a ${occupation} after graduating with a degree in ${educationLevel}.`
            : '';
        const pastJobs = workHistory.length > 0 ? `Before that, ${genderPronoun} also worked as a ${workHistory}.` : '';

        const jail = jailHistory.length > 0
            ? `${genderPronoun} had a brush with the law, serving time for ${jailHistory[0].reason}.`
            : '';

        return `${name} died at the age of ${years}. ${attendees} ${career} ${pastJobs} ${jail}`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="text-center bg-white p-8 rounded-lg shadow-2xl max-w-2xl w-full animate-fade-in">
                <h1 className="text-6xl font-extrabold text-red-700 mb-4">
                    You died!
                </h1>

                <p className="text-md text-stone-700 mb-8 italic border-y border-stone-200 py-4">
                    {generateObituary()}
                </p>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-stone-800 mb-4">Final Stats</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <StatDisplay label="Happiness" value={`${happiness}%`} />
                        <StatDisplay label="Smarts" value={`${smarts}%`} />
                        <StatDisplay label="Looks" value={`${looks}%`} />
                        <StatDisplay label="Karma" value={`${karma}%`} />
                        <StatDisplay label="Moral" value={`${moral}%`} />
                        <StatDisplay label="Health" value="0%" />
                        <StatDisplay label="Personality" value={personality} />
                    </div>
                </div>
                 <div className="space-y-4">
                    {heirs && heirs.length > 0 && (
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold text-stone-800 mb-3">Continue Your Legacy</h2>
                            <div className="space-y-2 max-w-sm mx-auto">
                                {heirs.map(child => (
                                    <button
                                        key={child.id}
                                        onClick={() => onContinueAsChild(child.id)}
                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 shadow-md"
                                    >
                                        Continue as {child.name} ({child.age} years old)
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <button
                        onClick={onRestart}
                        className="w-full max-w-xs bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                    >
                        Start a New Life
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameOverScreen;