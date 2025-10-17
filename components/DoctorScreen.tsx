import React from 'react';
import type { Character, Ailment } from '../types';

interface DoctorScreenProps {
    character: Character;
    onTreatAilment: (ailmentId: string) => void;
    onBack: () => void;
}

const getSeverityColor = (severity: Ailment['severity']) => {
    switch (severity) {
        case 'critical': return 'text-red-600 bg-red-100 border-red-300';
        case 'major': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
        case 'minor': return 'text-green-600 bg-green-100 border-green-300';
        default: return 'text-stone-600 bg-stone-100 border-stone-300';
    }
}

const DoctorScreen: React.FC<DoctorScreenProps> = ({ character, onTreatAilment, onBack }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-2xl relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition">&larr; Back to Activities</button>
                <h1 className="text-3xl font-extrabold text-stone-800 mb-6 text-center mt-8">Doctor's Office</h1>
                
                {character.ailments.length === 0 ? (
                    <div className="text-center text-stone-500 p-8">
                        <p className="text-4xl mb-4">🩺</p>
                        <p>The doctor gives you a clean bill of health. You have no active ailments.</p>
                    </div>
                ) : (
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        <p className="text-center text-stone-600 mb-4">Here are your current health issues. Treatment will be deducted from your bank account.</p>
                        {character.ailments.map(ailment => (
                            <div key={ailment.id} className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-bold text-stone-800">{ailment.name}</h2>
                                        <p className="text-sm text-stone-500 italic">{ailment.description}</p>
                                    </div>
                                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full border ${getSeverityColor(ailment.severity)}`}>
                                        {ailment.severity}
                                    </span>
                                </div>
                                <div className="mt-4 flex justify-between items-center bg-stone-100 p-3 rounded-md">
                                    <div>
                                        <p className="text-sm text-stone-500">Treatment Cost</p>
                                        <p className="font-bold text-lg">{character.currency.symbol}{ailment.treatmentCost.toLocaleString()}</p>
                                    </div>
                                    <button
                                        onClick={() => onTreatAilment(ailment.id)}
                                        disabled={character.bankBalance < ailment.treatmentCost}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        title={character.bankBalance < ailment.treatmentCost ? "Not enough money in bank" : `Treat ${ailment.name}`}
                                    >
                                        Treat
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorScreen;