import React from 'react';

interface MainMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onNewLife: () => void;
    onSaveLife: () => void;
}

const menuItems = [
    { name: 'New Life', action: 'newLife' },
    { name: 'Save Life', action: 'saveLife' },
    { name: 'Lives in progress', action: 'comingSoon' },
    { name: 'Achievements', action: 'comingSoon' },
    { name: 'Challenges', action: 'comingSoon', disabled: true },
    { name: 'Treasure', action: 'comingSoon' },
    { name: 'Heirlooms', action: 'comingSoon' },
    { name: 'Cemetery', action: 'comingSoon' },
    { name: 'Custom People', action: 'comingSoon' },
    { name: 'Edit Sports Teams', action: 'comingSoon' },
    { name: 'Job Packs', action: 'comingSoon' },
    { name: 'Expansion Packs', action: 'comingSoon' },
    { name: 'Settings', action: 'comingSoon' },
    { name: 'Theme', action: 'comingSoon' },
    { name: 'Redeem code', action: 'comingSoon' },
];

const MainMenu: React.FC<MainMenuProps> = ({ isOpen, onClose, onNewLife, onSaveLife }) => {
    
    const handleAction = (action: string, name: string) => {
        switch (action) {
            case 'newLife':
                onNewLife();
                onClose();
                break;
            case 'saveLife':
                onSaveLife();
                break;
            case 'comingSoon':
            default:
                alert(`${name} is coming soon!`);
                break;
        }
    };

    return (
        <div className={`fixed inset-0 z-50 flex ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} role="dialog" aria-modal="true">
            {/* Overlay */}
            <div className={`fixed inset-0 bg-black/60 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" onClick={onClose}></div>
            
            {/* Menu Panel */}
            <div className={`relative flex flex-col w-full max-w-xs bg-stone-800 text-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between p-4 border-b border-stone-700">
                    <h2 className="text-xl font-bold text-yellow-400">Main Menu</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-stone-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <nav className="flex-1 overflow-y-auto">
                    <ul className="py-2">
                        {menuItems.map(item => (
                            <li key={item.name}>
                                <button
                                    onClick={() => handleAction(item.action, item.name)}
                                    disabled={item.disabled}
                                    className="w-full text-left px-4 py-3 hover:bg-stone-700 transition-colors duration-200 disabled:text-stone-500 disabled:cursor-not-allowed"
                                >
                                    {item.name}{item.disabled && ' (soon)'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default MainMenu;