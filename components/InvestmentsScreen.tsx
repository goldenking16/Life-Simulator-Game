import React from 'react';
import { getFinancialOpinion, getMarketHealth } from '../data/services/gameService';

interface InvestmentsScreenProps {
    onBack: () => void;
    onNavigateToPortfolio: () => void;
    onNavigateToStats: () => void;
    onNavigateToNews: () => void;
    onNavigateToMarket: (type: 'stocks' | 'crypto') => void;
}

const ProgressBar: React.FC<{ value: number, label: string }> = ({ value, label }) => {
    const getColor = (val: number) => {
        if (val > 66) return 'bg-green-500';
        if (val > 33) return 'bg-yellow-400';
        return 'bg-red-500';
    };
    return (
        <div className="w-full">
            <div className="flex justify-between text-xs font-bold text-stone-600">
                <span>{label}</span>
                <span>{value}%</span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full mt-1">
                <div
                    className={`${getColor(value)} h-2 rounded-full`}
                    style={{ width: `${value}%` }}
                ></div>
            </div>
        </div>
    );
};

const MenuButton: React.FC<{ title: string; description: string; icon: string; onClick?: () => void; children?: React.ReactNode }> = ({ title, description, icon, onClick, children }) => (
    <button
        onClick={onClick}
        className="w-full bg-stone-100 hover:bg-yellow-100 border-2 border-stone-200 hover:border-yellow-400 p-4 rounded-lg transition flex items-center space-x-4 text-left"
    >
        <span className="text-4xl">{icon}</span>
        <div className="flex-grow">
            <h2 className="font-bold text-lg text-stone-800">{title}</h2>
            <p className="text-sm text-stone-500">{description}</p>
            {children}
        </div>
    </button>
);

const InvestmentsScreen: React.FC<InvestmentsScreenProps> = ({ onBack, onNavigateToPortfolio, onNavigateToStats, onNavigateToNews, onNavigateToMarket }) => {

    const handleComingSoon = (feature: string) => {
        alert(`${feature} functionality is coming soon!`);
    };

    const handleOpinion = () => {
        alert(getFinancialOpinion());
    };
    
    // Memoize health values so they don't change on every render
    const { stockHealth, bondHealth } = React.useMemo(() => ({
        stockHealth: getMarketHealth(),
        bondHealth: getMarketHealth(),
    }), []);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-2xl relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition">&larr; Back to Assets</button>
                <h1 className="text-3xl font-extrabold text-stone-800 mb-6 text-center mt-8">Investments</h1>

                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                    <MenuButton title="Portfolio" description="Manage your portfolio" icon="💼" onClick={onNavigateToPortfolio} />
                    <MenuButton title="Stats" description="View your lifetime performance" icon="📊" onClick={onNavigateToStats} />
                    <MenuButton title="Financial News" description="Know the latest news" icon="📰" onClick={onNavigateToNews} />
                    <MenuButton title="Opinion" description="Ask for someone's opinion" icon="💡" onClick={handleOpinion} />
                    <MenuButton title="Bonds" description="Market health" icon="📜" onClick={() => handleComingSoon('Bonds')}>
                        <ProgressBar value={bondHealth} label="Health" />
                    </MenuButton>
                    <MenuButton title="Crypto" description="Invest in cryptocurrency" icon="₿" onClick={() => onNavigateToMarket('crypto')} />
                    <MenuButton title="Funds" description="Get attractive funds" icon="🏦" onClick={() => handleComingSoon('Funds')} />
                    <MenuButton title="Penny Stocks" description="Invest in local companies" icon="📈" onClick={() => handleComingSoon('Penny Stocks')} />
                    <MenuButton title="Stocks" description="Market health" icon="🏭" onClick={() => onNavigateToMarket('stocks')}>
                        <ProgressBar value={stockHealth} label="Health" />
                    </MenuButton>
                </div>
            </div>
        </div>
    );
};

export default InvestmentsScreen;