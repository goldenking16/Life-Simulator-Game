import React from 'react';
import type { Character } from '../types';
import { countries } from '../data/countries';


interface EmigrateScreenProps {
    character: Character;
    onBack: () => void;
}

const EmigrateScreen: React.FC<EmigrateScreenProps> = ({ character, onBack }) => {

    const handleAction = (action: string) => {
        alert(`${action} functionality is coming soon!`);
    };
    
    // Get a few random countries to display, excluding the current one
    const destinationCountries = React.useMemo(() => {
        return countries
            .filter(c => c.name !== character.countryOfBirth)
            .sort(() => 0.5 - Math.random())
            .slice(0, 10);
    }, [character.countryOfBirth]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-2xl relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition">&larr; Back to Activities</button>
                <h1 className="text-3xl font-extrabold text-stone-800 mb-6 text-center mt-8">Emigrate</h1>
                
                <div className="space-y-6">
                    {/* Passport Section */}
                    <div>
                        <h2 className="text-xl font-bold text-stone-700 mb-3 border-b pb-2">Passport & Visa</h2>
                        <button 
                            onClick={() => handleAction('Passport Application')}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition shadow-md"
                        >
                            Apply for Passport
                        </button>
                    </div>

                    {/* Fly Section */}
                    <div>
                        <h2 className="text-xl font-bold text-stone-700 mb-3 border-b pb-2">Fly to a New Country</h2>
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                             {destinationCountries.map(country => (
                                <div key={country.name} className="bg-stone-100 p-3 rounded-lg flex justify-between items-center">
                                    <p className="font-semibold">{country.flag} {country.name}</p>
                                    <button 
                                        onClick={() => handleAction(`Flying to ${country.name}`)}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-md text-sm transition"
                                    >
                                        Fly
                                    </button>
                                </div>
                             ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmigrateScreen;