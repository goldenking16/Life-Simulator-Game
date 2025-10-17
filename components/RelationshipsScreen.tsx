import React, { useState, useMemo } from 'react';
import type { Character, NPC } from '../types';

interface RelationshipsScreenProps {
    character: Character;
    onInteract: (action: string, npcId: string) => void;
    onBack: () => void;
}

const getStatColor = (value: number) => {
    if (value > 66) return 'bg-green-500';
    if (value > 33) return 'bg-yellow-400';
    return 'bg-red-500';
};

const RelationshipBar: React.FC<{ value: number }> = ({ value }) => (
  <div className="h-2 bg-stone-200 rounded-full w-full">
    <div 
      className={`${getStatColor(value)} h-2 rounded-full transition-all duration-500`}
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

const NpcInteractionModal: React.FC<{ npc: NPC, character: Character, onInteract: (action: string, npcId: string) => void, onClose: () => void }> = ({ npc, character, onInteract, onClose }) => {
    const isFamily = ['Mother', 'Father', 'Brother', 'Sister', 'Half-Brother', 'Half-Sister', 'Son', 'Daughter'].includes(npc.relationshipType);

    const interactions = [
        { name: 'Ask Out', action: 'Ask Out', icon: '❤️', minAge: 12 * 12, disabled: isFamily || character.currentPartnerId === npc.id },
        { name: 'Ask for money', action: 'Ask for money', icon: '💰', minAge: 4 * 12 },
        { name: 'Compliment', action: 'Compliment', icon: '😊', minAge: 2 * 12 },
        { name: 'Conversation', action: 'Conversation', icon: '💬', minAge: 3 * 12 },
        { name: 'Deal', action: 'Deal', icon: '🤝', minAge: 16 * 12 },
        { name: 'Gift', action: 'Gift', icon: '🎁', minAge: 4 * 12 },
        { name: 'Give money', action: 'Give money', icon: '💸', minAge: 6 * 12 },
        { name: 'Insult', action: 'Insult', icon: '😠', minAge: 4 * 12 },
        { name: 'Recruit', action: 'Recruit', icon: '🙏', minAge: 18 * 12, disabled: !character.hasCult },
        { name: 'Rumble', action: 'Rumble', icon: '💥', minAge: 6 * 12 },
        { name: 'Spend time', action: 'Spend time', icon: '👨‍👩‍👧' },
        { name: 'Spy', action: 'Spy', icon: '👀', minAge: 13 * 12 },
        { name: 'Squabble', action: 'Squabble', icon: '🗯️', minAge: 4 * 12 },
    ];
    
    const handleAction = (action: string) => {
        onInteract(action, npc.id);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-20 p-4 animate-fade-in">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full relative">
                 <button onClick={onClose} className="absolute top-2 right-2 text-stone-400 hover:text-stone-600 text-2xl">&times;</button>
                <div className="text-center border-b pb-4 mb-4">
                    <h2 className="text-2xl font-bold">{npc.name}</h2>
                    <p className="text-stone-500">{npc.relationshipType}</p>
                </div>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                    {interactions.map(interaction => {
                        const isAgeGated = interaction.minAge && character.age < interaction.minAge;
                        const title = isAgeGated ? `Must be ${Math.floor(interaction.minAge / 12)} years old` : '';
                         return (
                             <button 
                                key={interaction.name}
                                onClick={() => handleAction(interaction.action)}
                                disabled={interaction.disabled || isAgeGated}
                                title={title}
                                className="w-full bg-stone-100 hover:bg-yellow-100 p-3 rounded-lg transition flex items-center space-x-3 text-left disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-stone-100"
                             >
                                <span className="text-2xl">{interaction.icon}</span>
                                <span className="font-semibold text-stone-700">{interaction.name}</span>
                            </button>
                         )
                    })}
                </div>
            </div>
        </div>
    )
};


const RelationshipsScreen: React.FC<RelationshipsScreenProps> = ({ character, onInteract, onBack }) => {
    const [selectedNpc, setSelectedNpc] = useState<NPC | null>(null);

    const groupedNpcs = useMemo(() => {
        const groups: { [key: string]: NPC[] } = {
            Partner: [],
            Parents: [],
            Siblings: [],
            Children: [],
            Exes: [],
            Other: [],
        };

        character.npcs.forEach(npc => {
            if (npc.id === character.currentPartnerId) {
                groups.Partner.push(npc);
            } else if (['Mother', 'Father'].includes(npc.relationshipType)) {
                groups.Parents.push(npc);
            } else if (['Brother', 'Sister', 'Half-Brother', 'Half-Sister'].includes(npc.relationshipType)) {
                groups.Siblings.push(npc);
            } else if (['Son', 'Daughter'].includes(npc.relationshipType)) {
                groups.Children.push(npc);
            } else if (npc.relationshipType.startsWith('Ex-')) {
                 groups.Exes.push(npc);
            } else {
                groups.Other.push(npc);
            }
        });

        return groups;
    }, [character.npcs, character.currentPartnerId]);

    return (
        <div className="flex flex-col h-screen max-w-lg mx-auto bg-amber-50 shadow-2xl">
            {selectedNpc && <NpcInteractionModal npc={selectedNpc} character={character} onInteract={onInteract} onClose={() => setSelectedNpc(null)} />}
            
            <header className="bg-gradient-to-b from-yellow-500 to-amber-600 p-4 flex items-center justify-center relative shadow-md">
                <button onClick={onBack} className="absolute left-4 text-stone-800 font-extrabold text-2xl">&times;</button>
                <h1 className="text-2xl font-extrabold text-stone-900 tracking-wider">RELATIONSHIPS</h1>
            </header>

            <main className="flex-grow overflow-y-auto">
                <button onClick={() => alert("Commune feature coming soon!")} className="w-full text-left p-4 flex items-center gap-4 bg-white hover:bg-stone-50 transition border-b">
                    <span className="text-3xl">🕯️</span>
                    <div>
                        <p className="font-bold text-lg text-stone-800">Commune</p>
                        <p className="text-sm text-stone-500">Start a cult</p>
                    </div>
                    <span className="ml-auto text-xl text-stone-400">&gt;</span>
                </button>

                {Object.entries(groupedNpcs).map(([groupName, npcs]) => (
                    npcs.length > 0 && (
                        <div key={groupName}>
                            <div className="bg-stone-600 text-white font-bold p-2 px-4 text-sm">{groupName}</div>
                            <div className="divide-y divide-stone-100">
                                {npcs.map(npc => (
                                    <button key={npc.id} onClick={() => setSelectedNpc(npc)} className="w-full text-left p-3 flex items-center gap-3 bg-white hover:bg-stone-50 transition">
                                        <span className="text-4xl">{npc.avatar}</span>
                                        <div className="flex-grow">
                                            <p className="font-bold text-stone-800">{npc.name} <span className="font-normal text-stone-500">({npc.relationshipType})</span></p>
                                            <div className="flex items-center gap-2 mt-1">
                                               <span className="text-xs text-stone-500 font-semibold">Relationship</span>
                                               <RelationshipBar value={npc.relationshipStatus} />
                                            </div>
                                        </div>
                                        <span className="text-xl text-stone-400">&gt;</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </main>
        </div>
    );
};

export default RelationshipsScreen;