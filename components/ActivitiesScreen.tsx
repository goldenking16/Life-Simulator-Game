import React from 'react';
import type { Character } from '../types';

interface ActivitiesScreenProps {
    character: Character;
    onBack: () => void;
    onNavigateToSocialMedia: () => void;
    onNavigateToDoctor: () => void;
    onNavigateToMindAndBody: () => void;
    onNavigateToLove: () => void;
    onNavigateToLicenses: () => void;
    onNavigateToPremiumActivities: () => void;
    onNavigateToAdoptionCenter: () => void;
    onNavigateToPets: () => void;
    onNavigateToEmigrate: () => void;
}

const activities = [
    { name: 'Adoption', icon: '👶', action: 'adoption' },
    { name: 'Doctor', icon: '⚕️', action: 'doctor' },
    { name: 'Social Media', icon: '📱', action: 'social_media' },
    { name: 'Crime', icon: '💀' },
    { name: 'Emigrate', icon: '✈️', action: 'emigrate' },
    { name: 'Fame', icon: '⭐' },
    { name: 'License', icon: '📜', action: 'license' },
    { name: 'Lottery', icon: '🎟️' },
    { name: 'Love', icon: '❤️', action: 'love' },
    { name: 'Mind & Body', icon: '🧘', action: 'mind_and_body' },
    { name: 'Pets', icon: '🐾', action: 'pets' },
    { name: 'Vacation', icon: '🏖️' },
    { name: 'Premium', icon: '💎', action: 'premium' },
];

const ActivitiesScreen: React.FC<ActivitiesScreenProps> = ({ character, onBack, onNavigateToSocialMedia, onNavigateToDoctor, onNavigateToMindAndBody, onNavigateToLove, onNavigateToLicenses, onNavigateToPremiumActivities, onNavigateToAdoptionCenter, onNavigateToPets, onNavigateToEmigrate }) => {
    // Shuffle activities for random display as requested
    const shuffledActivities = React.useMemo(() => activities.sort(() => 0.5 - Math.random()), []);

    const handleActivityClick = (activityName: string, action?: string) => {
        if (action === 'social_media') {
            onNavigateToSocialMedia();
        } else if (action === 'doctor') {
            onNavigateToDoctor();
        } else if (action === 'mind_and_body') {
            onNavigateToMindAndBody();
        } else if (action === 'love') {
            onNavigateToLove();
        } else if (action === 'license') {
            onNavigateToLicenses();
        } else if (action === 'premium') {
            onNavigateToPremiumActivities();
        } else if (action === 'adoption') {
            onNavigateToAdoptionCenter();
        } else if (action === 'pets') {
            onNavigateToPets();
        } else if (action === 'emigrate') {
            onNavigateToEmigrate();
        } else {
            alert(`${activityName} functionality is coming soon!`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-2xl relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition">&larr; Back to Game</button>
                <h1 className="text-3xl font-extrabold text-stone-800 mb-6 text-center mt-8">Activities</h1>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {shuffledActivities.map(activity => (
                         <button 
                            key={activity.name}
                            onClick={() => handleActivityClick(activity.name, activity.action)}
                            className="bg-stone-100 hover:bg-yellow-100 border-2 border-stone-200 hover:border-yellow-400 p-4 rounded-lg transition flex flex-col items-center justify-center space-y-2 h-32"
                         >
                             <span className="text-4xl">{activity.icon}</span>
                             <span className="font-bold text-stone-700 text-center">{activity.name}</span>
                         </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActivitiesScreen;