
import React, { useState } from 'react';
import type { Character } from '../types';

interface BankAccountScreenProps {
    character: Character;
    onUpdateFinances: (newCash: number, newBankBalance: number) => void;
    onBack: () => void;
}

const BankAccountScreen: React.FC<BankAccountScreenProps> = ({ character, onUpdateFinances, onBack }) => {
    const [amount, setAmount] = useState<string>('');
    const [error, setError] = useState<string>('');

    const totalWealth = character.cash + character.bankBalance;
    
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) { // only allow digits
            setAmount(value);
            setError('');
        }
    };
    
    const getAmount = () => {
        const numAmount = parseInt(amount, 10);
        if (isNaN(numAmount) || numAmount <= 0) {
            setError('Please enter a valid amount.');
            return null;
        }
        return numAmount;
    };

    const handleDeposit = () => {
        const numAmount = getAmount();
        if (numAmount === null) return;
        
        if (numAmount > character.cash) {
            setError("You don't have enough cash to deposit that amount.");
            return;
        }
        
        onUpdateFinances(character.cash - numAmount, character.bankBalance + numAmount);
        setAmount('');
        setError('');
    };
    
    const handleWithdraw = () => {
        const numAmount = getAmount();
        if (numAmount === null) return;

        if (numAmount > character.bankBalance) {
            setError("You don't have enough funds in your bank account.");
            return;
        }

        onUpdateFinances(character.cash + numAmount, character.bankBalance - numAmount);
        setAmount('');
        setError('');
    };

    const setMaxAmount = (type: 'deposit' | 'withdraw') => {
        if (type === 'deposit') {
            setAmount(character.cash.toString());
        } else {
            setAmount(character.bankBalance.toString());
        }
        setError('');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition">&larr; Back to Game</button>
                <h1 className="text-3xl font-extrabold text-stone-800 mb-6 text-center mt-8">Bank Account</h1>
                
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center bg-stone-100 p-3 rounded-lg">
                        <span className="text-stone-500">Total Wealth:</span>
                        <span className="text-2xl font-bold text-green-600">{character.currency.symbol}{totalWealth.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center bg-stone-100 p-3 rounded-lg">
                        <span className="text-stone-500">Cash on Hand:</span>
                        <span className="font-bold text-stone-800">{character.currency.symbol}{character.cash.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center bg-stone-100 p-3 rounded-lg">
                        <span className="text-stone-500">Bank Balance:</span>
                        <span className="font-bold text-stone-800">{character.currency.symbol}{character.bankBalance.toLocaleString()}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">{character.currency.symbol}</span>
                        <input 
                            type="text" 
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="Enter amount"
                            className="w-full bg-stone-100 p-3 pl-6 rounded text-stone-800 text-center border border-stone-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <button onClick={() => setMaxAmount('deposit')} className="text-center text-teal-600 hover:text-teal-500 font-semibold">Deposit Max</button>
                        <button onClick={() => setMaxAmount('withdraw')} className="text-center text-orange-600 hover:text-orange-500 font-semibold">Withdraw Max</button>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={handleDeposit} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 shadow-md">
                            Deposit
                        </button>
                        <button onClick={handleWithdraw} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 shadow-md">
                            Withdraw
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BankAccountScreen;
