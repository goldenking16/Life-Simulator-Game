import React from 'react';

interface PetsScreenProps {
    onBack: () => void;
}

const petCategories = [
    { name: 'Cat', icon: '🐈' },
    { name: 'Dog', icon: '🐕' },
    { name: 'Snake', icon: '🐍' },
    { name: 'Horse', icon: '🐎' },
    { name: 'Bird', icon: '🦜' },
    { name: 'Fish', icon: '🐠' },
    { name: 'Rabbit', icon: '🐇' },
    { name: 'Exotic Pet', icon: '🦎' },
];

const PetsScreen: React.FC<PetsScreenProps> = ({ onBack }) => {

    const handleCategoryClick = (categoryName: string) => {
        alert(`${categoryName} adoption is coming soon!`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-2xl relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition">&larr; Back to Activities</button>
                <h1 className="text-3xl font-extrabold text-stone-800 mb-6 text-center mt-8">Pets</h1>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {petCategories.map(pet => (
                         <button 
                            key={pet.name}
                            onClick={() => handleCategoryClick(pet.name)}
                            className="bg-stone-100 hover:bg-yellow-100 border-2 border-stone-200 hover:border-yellow-400 p-4 rounded-lg transition flex flex-col items-center justify-center space-y-2 h-32"
                         >
                             <span className="text-4xl">{pet.icon}</span>
                             <span className="font-bold text-stone-700 text-center">{pet.name}</span>
                         </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PetsScreen;