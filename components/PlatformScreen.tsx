import React, { useState } from 'react';
import type { Character, SocialMediaPlatform } from '../types';

interface PlatformScreenProps {
    character: Character;
    platform: SocialMediaPlatform;
    onBack: () => void;
    onPost: (platform: SocialMediaPlatform) => void;
    onBuyFollowers: (platform: SocialMediaPlatform, amount: number) => void;
    onVerify: (platform: SocialMediaPlatform) => void;
}

const platformDetails: { [key in SocialMediaPlatform]: { icon: string; minAge: number } } = {
    'Facebook': { icon: '📘', minAge: 13 },
    'Instagram': { icon: '📸', minAge: 13 },
    'YouTube': { icon: '📺', minAge: 13 },
    'Twitter': { icon: '🐦', minAge: 13 },
    'Twitch': { icon: '🎮', minAge: 13 },
    'Podcast': { icon: '🎙️', minAge: 16 },
    'OnlyFans': { icon: '🔞', minAge: 18 },
};

const ActionButton: React.FC<{ onClick: () => void; disabled?: boolean; title?: string; children: React.ReactNode; }> = ({ onClick, disabled, title, children }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        title={title}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
        {children}
    </button>
);


const PlatformScreen: React.FC<PlatformScreenProps> = ({ character, platform, onBack, onPost, onBuyFollowers, onVerify }) => {
    const stats = character.socialMedia[platform] || { followers: 0, isMonetized: false, isVerified: false, posts: 0 };
    const details = platformDetails[platform];
    const ageInYears = Math.floor(character.age / 12);
    const isAgeGated = ageInYears < details.minAge;

    const [buyAmount, setBuyAmount] = useState('');
    
    const handleBuyFollowersClick = () => {
        const amount = parseInt(buyAmount, 10);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid number of followers to buy.');
            return;
        }
        onBuyFollowers(platform, amount);
        setBuyAmount('');
    };

    const handleComingSoon = (feature: string) => {
        alert(`${feature} is coming soon!`);
    }

    if (isAgeGated) {
        return (
             <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl relative text-center">
                    <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition">&larr; Back</button>
                    <p className="text-2xl mb-4">{details.icon}</p>
                    <p className="text-red-500 font-semibold">You must be {details.minAge} years old to use {platform}.</p>
                </div>
            </div>
        )
    }

    return (
         <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-2xl relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition">&larr; Back to Hub</button>
                <div className="text-center mt-8">
                    <h1 className="text-4xl font-extrabold text-stone-800 flex items-center justify-center gap-3">
                        {details.icon} {platform} {stats.isVerified && <span className="text-2xl text-blue-500" title="Verified Account">✔️</span>}
                    </h1>
                    <div className="grid grid-cols-2 gap-4 my-4 text-lg">
                        <div className="bg-stone-100 p-2 rounded">
                            <p className="text-sm text-stone-500">Followers</p>
                            <p className="font-bold">{stats.followers.toLocaleString()}</p>
                        </div>
                         <div className="bg-stone-100 p-2 rounded">
                            <p className="text-sm text-stone-500">Posts</p>
                            <p className="font-bold">{stats.posts.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 mt-6">
                    <ActionButton onClick={() => onPost(platform)}>Create Post</ActionButton>
                    
                    <div className="grid grid-cols-3 gap-2">
                        <input 
                            type="number"
                            value={buyAmount}
                            onChange={(e) => setBuyAmount(e.target.value)}
                            placeholder="Amount"
                            className="col-span-2 bg-stone-100 p-3 rounded text-stone-800 border border-stone-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        />
                        <button onClick={handleBuyFollowersClick} className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition shadow-md">Buy Followers</button>
                    </div>

                    <ActionButton onClick={() => onVerify(platform)} disabled={stats.isVerified} title={stats.isVerified ? "You are already verified" : "Requires 100k followers & 50 charisma"}>
                        {stats.isVerified ? "Verified" : "Verify Account"}
                    </ActionButton>
                    <ActionButton onClick={() => handleComingSoon("Promoting products")} >Promote a Product</ActionButton>
                    <ActionButton onClick={() => handleComingSoon("Monetization")} >Monetize</ActionButton>
                    <ActionButton onClick={() => handleComingSoon("Running ads")} >Run Ads</ActionButton>
                </div>
            </div>
        </div>
    );
};

export default PlatformScreen;
