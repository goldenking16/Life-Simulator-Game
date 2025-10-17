import React, { useState, useEffect } from 'react';
import type { Character } from '../types';
import { getAdoptableChildren } from '../data/services/gameService';

type AdoptableChild = { name: string; age: number; gender: 'Male' | 'Female', health: number, happiness: number, smarts: number, looks: number, personality: string };

interface AdoptionCenterScreenProps {
    character: Character;
    onAdoptChild: (child: AdoptableChild) => void;
    onBack: () => void;
}

const getStatColor = (value: number) => {
    if (value > 66) return 'bg-green-500';
    if (value > 33) return 'bg-yellow-400';
    return 'bg-red-500';
};

const MiniStatBar: React.FC<{ label: string; value: number; }> = ({ label, value }) => (
  <div className="w-full">
    <div className="flex justify-between items-center text-xs mb-0.5 text-stone-600">
      <span className="font-semibold">{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 bg-stone-200 rounded-full">
      <div 
        className={`${getStatColor(value)} h-2 rounded-full`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

const AdoptionCenterScreen: React.FC<AdoptionCenterScreenProps> = ({ character, onAdoptChild, onBack }) => {
    const [children, setChildren] = useState<AdoptableChild[]>([]);
    
    useEffect(() => {
        // Generate a new list of children each time the component is mounted
        setChildren(getAdoptableChildren(character));
    }, [character]);

    const handleAdopt = (child: AdoptableChild) => {
        if (window.confirm(`Are you sure you want to adopt ${child.name}? This is a lifelong commitment.`)) {
            onAdoptChild(child);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-2xl relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition">&larr; Back to Activities</button>
                <h1 className="text-3xl font-extrabold text-stone-800 mb-6 text-center mt-8">Adoption Center</h1>

                {children.length === 0 ? (
                    <p className="text-stone-500 text-center py-8">There are no children available for adoption at this time. Please check back later.</p>
                ) : (
                    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                        {children.map((child, index) => (
                            <div key={index} className="bg-stone-100 p-4 rounded-lg flex justify-between items-center border border-stone-200 animate-fade-in">
                                <div className="flex-grow pr-4">
                                    <h3 className="font-bold text-lg text-green-700">{child.name}</h3>
                                    <p className="text-sm text-stone-500">
                                        {child.age} year old {child.gender === 'Male' ? 'boy' : 'girl'}
                                    </p>
                                    <p className="text-sm text-stone-600 font-semibold mt-1">Personality: {child.personality}</p>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs">
                                        <MiniStatBar label="Health" value={child.health} />
                                        <MiniStatBar label="Happiness" value={child.happiness} />
                                        <MiniStatBar label="Smarts" value={child.smarts} />
                                        <MiniStatBar label="Looks" value={child.looks} />
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleAdopt(child)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition whitespace-nowrap ml-4 shadow-sm self-center"
                                >
                                    Adopt
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdoptionCenterScreen;