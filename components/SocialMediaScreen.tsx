import React from 'react';
import type { Character, SocialMediaPlatform } from '../types';

interface SocialMediaScreenProps {
    character: Character;
    onSelectPlatform: (platform: SocialMediaPlatform) => void;
    onBack: () => void;
}

const platforms: { name: SocialMediaPlatform; icon: string; }[] = [
    { name: 'Facebook', icon: '📘' },
    { name: 'Instagram', icon: '📸' },
    { name: 'YouTube', icon: '📺' },
    { name: 'Twitter', icon: '🐦' },
    { name: 'Twitch', icon: '🎮' },
    { name: 'Podcast', icon: '🎙️' },
    { name: 'OnlyFans', icon: '🔞' },
];

const SocialMediaScreen: React.FC<SocialMediaScreenProps> = ({ character, onSelectPlatform, onBack }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-2xl relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition">&larr; Back to Activities</button>
                <h1 className="text-3xl font-extrabold text-stone-800 mb-6 text-center mt-8">Social Media</h1>
                
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                    {platforms.map(platform => {
                        const stats = character.socialMedia[platform.name];
                        return (
                            <button 
                                key={platform.name}
                                onClick={() => onSelectPlatform(platform.name)}
                                className="w-full bg-stone-100 hover:bg-yellow-100 border-2 border-stone-200 hover:border-yellow-400 p-4 rounded-lg transition flex items-center space-x-4 text-left"
                            >
                                <span className="text-4xl">{platform.icon}</span>
                                <div className="flex-grow">
                                    <h2 className="font-bold text-lg text-stone-800">{platform.name}</h2>
                                    <p className="text-sm text-stone-500">
                                        Followers: <span className="font-semibold text-stone-700">{stats?.followers?.toLocaleString() || 0}</span>
                                    </p>
                                </div>
                                {stats?.isVerified && <span className="text-2xl text-blue-500" title="Verified Account">✔️</span>}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SocialMediaScreen;
