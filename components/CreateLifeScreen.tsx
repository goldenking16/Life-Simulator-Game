import React, { useState, useEffect } from 'react';
import type { CustomLifeData } from '../types';
import { countries } from '../data/countries';
import { allCities } from '../data/cities';
import Spinner from './Spinner';

interface CreateLifeScreenProps {
    onStartRandom: () => void;
    onStartCustom: (data: CustomLifeData) => void;
    onBack: () => void;
}

const CreateLifeScreen: React.FC<CreateLifeScreenProps> = ({ onStartRandom, onStartCustom, onBack }) => {
    const [mode, setMode] = useState<'choice' | 'custom'>('choice');
    const [citiesForCountry, setCitiesForCountry] = useState<string[]>(allCities[countries[0].name] || []);
    const [formData, setFormData] = useState<CustomLifeData>({
        firstName: '',
        lastName: '',
        gender: 'Male',
        dob_day: '1',
        dob_month: '1',
        dob_year: new Date().getFullYear().toString(),
        country: countries[0].name,
        city: citiesForCountry[0] || '',
        motherName: '',
        fatherName: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const newCities = allCities[formData.country] || [];
        setCitiesForCountry(newCities);
        setFormData(prev => ({
            ...prev,
            city: newCities[0] || '' // Reset city when country changes
        }));
    }, [formData.country]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    
    const validateForm = () => {
        for (const key in formData) {
            if (formData[key as keyof CustomLifeData].trim() === '') {
                setError('All fields must be filled out.');
                return false;
            }
        }
        const year = parseInt(formData.dob_year, 10);
        if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
            setError(`Please enter a valid year between 1900 and ${new Date().getFullYear()}.`);
            return false;
        }
        setError('');
        return true;
    };

    const handleCustomSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onStartCustom(formData);
        }
    };

    const inputClasses = "bg-stone-100 p-2 rounded text-stone-800 w-full border border-stone-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none";

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-2xl relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition">&larr; Back</button>
                <h1 className="text-4xl font-extrabold text-stone-800 mb-6 text-center">Create a New Life</h1>

                {mode === 'choice' && (
                    <div className="animate-fade-in text-center">
                        <p className="text-stone-600 mb-8">How do you want to begin your journey?</p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <button onClick={onStartRandom} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 shadow-md">
                                Start a Random Life
                            </button>
                            <button onClick={() => setMode('custom')} className="bg-stone-700 hover:bg-stone-800 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 shadow-md">
                                Create a Custom Life
                            </button>
                        </div>
                    </div>
                )}
                
                {mode === 'custom' && (
                     <form onSubmit={handleCustomSubmit} className="space-y-4 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className={inputClasses} />
                           <input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className={inputClasses} />
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select name="gender" value={formData.gender} onChange={handleInputChange} className={inputClasses}>
                               <option>Male</option>
                               <option>Female</option>
                           </select>
                            <select name="country" value={formData.country} onChange={handleInputChange} className={inputClasses}>
                                {countries.map(c => <option key={c.name}>{c.name}</option>)}
                           </select>
                        </div>
                        <div>
                             <label className="text-sm text-stone-500">City of Birth</label>
                             <select name="city" value={formData.city} onChange={handleInputChange} className={inputClasses} disabled={citiesForCountry.length === 0}>
                                {citiesForCountry.map(city => <option key={city}>{city}</option>)}
                             </select>
                        </div>
                         <div>
                            <label className="text-sm text-stone-500">Date of Birth</label>
                            <div className="grid grid-cols-3 gap-2">
                                <input type="number" name="dob_day" value={formData.dob_day} onChange={handleInputChange} placeholder="Day" min="1" max="31" className={inputClasses} />
                                <input type="number" name="dob_month" value={formData.dob_month} onChange={handleInputChange} placeholder="Month" min="1" max="12" className={inputClasses} />
                                <input type="number" name="dob_year" value={formData.dob_year} onChange={handleInputChange} placeholder="Year" className={inputClasses} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="motherName" value={formData.motherName} onChange={handleInputChange} placeholder="Mother's Name" className={inputClasses} />
                           <input name="fatherName" value={formData.fatherName} onChange={handleInputChange} placeholder="Father's Name" className={inputClasses} />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 shadow-md">
                           Begin My Life
                        </button>
                    </form>
                )}

            </div>
        </div>
    );
};

export default CreateLifeScreen;