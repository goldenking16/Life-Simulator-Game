
import React from 'react';
import Spinner from './Spinner';

interface StartScreenProps {
  onStartCreation: () => void;
  onLoadGame: () => void;
  canLoad: boolean;
  isLoading: boolean;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartCreation, onLoadGame, canLoad, isLoading }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
      { isLoading && <div className="absolute inset-0 bg-amber-50/50 flex items-center justify-center z-50"><Spinner className="w-16 h-16"/></div> }
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-stone-800 mb-4 tracking-wider">
          Life Simulator
        </h1>
        <p className="text-lg text-stone-600 mb-12">
          Your choices. Your destiny.
        </p>
      </div>
      <div className="space-y-4 w-full max-w-xs">
        <button
          onClick={onStartCreation}
          disabled={isLoading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md disabled:bg-green-300 disabled:cursor-not-allowed flex items-center justify-center"
        >
          New Life
        </button>
        <button
          onClick={onLoadGame}
          disabled={!canLoad || isLoading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md disabled:bg-yellow-300 disabled:text-gray-100 disabled:cursor-not-allowed"
        >
          Load Life
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
