import React, { useState } from 'react';
import type { Character, GameLogEntry, GameEvent, EventOutcome } from '../types';
import Spinner from './Spinner';
import { countries } from '../data/countries';
import MainMenu from './MainMenu';

interface GameScreenProps {
  character: Character;
  log: GameLogEntry[];
  currentEvent: GameEvent | null;
  currentOutcome: EventOutcome | null;
  onAgeUp: () => void;
  onChoice: (eventId: string, choiceIndex: number) => void;
  onNavigateToBank: () => void;
  onNavigateToJob: () => void;
  onNavigateToAssets: () => void;
  onNavigateToActivities: () => void;
  onNavigateToRelationships: () => void;
  onReturnToGame: () => void;
  gameStatus: 'playing' | 'event' | 'outcome';
  onNewLife: () => void;
  onSaveLife: () => void;
}

const getStatColor = (value: number) => {
    if (value > 66) return 'bg-green-500';
    if (value > 33) return 'bg-yellow-400';
    return 'bg-red-500';
};

const StatBar: React.FC<{ label: string; value: number; icon: string }> = ({ label, value, icon }) => (
  <div className="w-full">
    <div className="flex justify-between items-center text-xs mb-0.5 text-stone-700">
      <span className="font-bold flex items-center">{icon}&nbsp;{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-3 bg-stone-200 rounded-full">
      <div 
        className={`${getStatColor(value)} h-3 rounded-full transition-all duration-500`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

const FooterActionButton: React.FC<{ label: string; icon: string; onClick?: () => void; disabled?: boolean; }> = ({ label, icon, onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled} className="flex flex-col items-center justify-center text-white p-1 rounded-lg enabled:hover:bg-black/10 transition">
        <span className="text-xl">{icon}</span>
        <span className="text-xs font-bold">{label}</span>
    </button>
);

const GameScreen: React.FC<GameScreenProps> = ({ character, log, currentEvent, currentOutcome, onAgeUp, onChoice, onNavigateToBank, onNavigateToJob, onNavigateToAssets, onNavigateToActivities, onNavigateToRelationships, onReturnToGame, gameStatus, onNewLife, onSaveLife }) => {
    
    const logContainerRef = React.useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    React.useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [log, currentOutcome]);

    const formatLogAge = (totalMonths: number) => {
        if (totalMonths === 0) return "Age: Newborn";
        
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;
        
        const parts = [];
        if (years > 0) {
            parts.push(`${years} year${years !== 1 ? 's' : ''}`);
        }
        if (months > 0) {
            parts.push(`${months} month${months !== 1 ? 's' : ''}`);
        }
        
        return `Age: ${parts.join(', ')}`;
    };

    const country = countries.find(c => c.name === character.countryOfBirth);

    return (
        <div className="h-screen bg-amber-50 text-stone-800 flex flex-col max-w-lg mx-auto shadow-2xl">
            <MainMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onNewLife={onNewLife}
                onSaveLife={onSaveLife}
            />
            {/* Header */}
            <header className="bg-gradient-to-b from-yellow-400 to-yellow-500 p-3 shadow-md flex-shrink-0">
                 <div className="flex justify-between items-center gap-3">
                    {/* Left side: Menu, Avatar, Name */}
                    <div className="flex items-center gap-3 min-w-0">
                        <button onClick={() => setIsMenuOpen(true)} className="text-stone-900 p-2 rounded-full enabled:hover:bg-black/10 transition flex-shrink-0">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                        <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center text-2xl shadow-inner flex-shrink-0">
                            {character.gender === 'Male' ? '👨' : '👩'}
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-xl font-extrabold text-stone-900 truncate">{character.name}</h1>
                            <p className="text-sm text-stone-700 font-semibold truncate">{country?.flag} {character.occupation}</p>
                        </div>
                    </div>
                    
                    {/* Right side: Net Worth */}
                    <div className="text-right flex-shrink-0">
                        <p className="font-extrabold text-xl text-green-800">{character.currency.symbol}{(character.cash + character.bankBalance).toLocaleString()}</p>
                        <p className="text-sm font-bold text-stone-700">Net Worth</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main ref={logContainerRef} className="flex-grow p-4 overflow-y-auto space-y-3 bg-white">
                {log.map((entry, index) => (
                    <div key={index} className="text-sm">
                        <p className="font-bold text-stone-500">{formatLogAge(entry.age)}</p>
                        <p>{entry.eventDescription}</p>
                        <p className="text-stone-600 italic">"{entry.choiceText}"</p>
                        <p className={`${entry.isPositive ? 'text-green-600 font-semibold' : ''}`}>{entry.outcomeNarrative}</p>
                    </div>
                ))}
            </main>

            {/* Event/Outcome Modal */}
            {(gameStatus === 'event' || gameStatus === 'outcome') && (
                 <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-20 p-4 animate-fade-in">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full text-center">
                        
                        {gameStatus === 'event' && currentEvent && (
                             <>
                                <p className="text-lg font-semibold mb-6">{currentEvent.description}</p>
                                <div className="grid grid-cols-1 gap-3 w-full">
                                    {currentEvent.choices.map((choice, index) => (
                                        <button 
                                            key={index}
                                            onClick={() => onChoice(currentEvent.eventId, index)}
                                            className="w-full bg-stone-700 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                                        >
                                            {choice.text}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                        
                        {gameStatus === 'outcome' && currentOutcome && (
                            <>
                                <p className="text-lg mb-6">{currentOutcome.narrative}</p>
                                <button
                                  onClick={onReturnToGame}
                                  className="w-full max-w-xs bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
                                >
                                  Continue
                                </button>
                            </>
                        )}
                    </div>
                 </div>
            )}


            {/* Stats Panel */}
            <section className="bg-white p-2 border-t border-b border-stone-200 flex-shrink-0">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <StatBar label="Happiness" value={character.happiness} icon="😊" />
                  <StatBar label="Health" value={character.health} icon="❤️" />
                  <StatBar label="Smarts" value={character.smarts} icon="💡" />
                  <StatBar label="Looks" value={character.looks} icon="🔥" />
                  <StatBar label="Karma" value={character.karma} icon="⚖️" />
                  <StatBar label="Moral" value={character.moral} icon="😇" />
                  {character.fame > 10 && <StatBar label="Fame" value={character.fame} icon="⭐" />}
                </div>
            </section>
            
            {/* Footer */}
            <footer className="bg-gradient-to-b from-yellow-500 to-yellow-600 p-1 pt-9 shadow-inner relative flex-shrink-0">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                    <button onClick={onAgeUp} className="bg-gradient-to-b from-green-400 to-green-600 text-white rounded-full w-16 h-16 flex flex-col items-center justify-center font-extrabold text-base shadow-lg border-2 border-white/50 transform hover:scale-110 transition mx-auto">
                        + Age
                    </button>
                </div>
                <div className="grid grid-cols-5 items-start gap-0">
                   <FooterActionButton label="Job" icon="💼" onClick={onNavigateToJob} />
                   <FooterActionButton label="Assets" icon="🏠" onClick={onNavigateToAssets} />
                   <FooterActionButton label="Activities" icon="🎯" onClick={onNavigateToActivities} />
                   <FooterActionButton label="Bank" icon="🏦" onClick={onNavigateToBank} />
                   <FooterActionButton label="Relationships" icon="👨‍👩‍👧‍👦" onClick={onNavigateToRelationships} />
                </div>
            </footer>
        </div>
    );
};

export default GameScreen;