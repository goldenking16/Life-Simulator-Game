import React, { useState, useEffect } from 'react';
import type { Character, Job } from '../types';
import { getAvailableJobs } from '../data/services/gameService';

interface JobScreenProps {
    character: Character;
    onApplyForJob: (job: Job) => void;
    onBack: () => void;
}

type JobView = 'main' | 'education' | 'part-time';

// --- Sub-Components for Views ---

const MainMenuContent: React.FC<{ setView: (view: JobView) => void }> = ({ setView }) => {
    const MenuButton: React.FC<{ title: string; description: string; icon: string; onClick?: () => void; disabled?: boolean; }> = ({ title, description, icon, onClick, disabled }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-full bg-stone-100 hover:bg-yellow-100 border-2 border-stone-200 hover:border-yellow-400 p-4 rounded-lg transition flex items-center space-x-4 text-left disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-stone-100 disabled:hover:border-stone-200"
        >
            <span className="text-4xl">{icon}</span>
            <div className="flex-grow">
                <h2 className="font-bold text-lg text-stone-800">{title}</h2>
                <p className="text-sm text-stone-500">{description}</p>
            </div>
            {disabled && <span className="text-xs font-bold text-red-500 bg-white/50 px-2 py-1 rounded-full">PRO</span>}
        </button>
    );

    const handleComingSoon = (feature: string) => {
        alert(`${feature} is coming soon!`);
    };

    return (
        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
            <MenuButton title="Education" description="Go back to school or manage your studies" icon="🎓" onClick={() => setView('education')} />
            <MenuButton title="Freelance Gigs" description="Make money freelancing" icon="💻" onClick={() => handleComingSoon('Freelance Gigs')} />
            <MenuButton title="Job Recruiter" description="Pay someone to get a job for you" icon="🤝" onClick={() => handleComingSoon('Job Recruiter')} />
            <MenuButton title="Military" description="Join the military" icon="🎖️" onClick={() => handleComingSoon('Military')} />
            <MenuButton title="Part-Time Jobs" description="Hourly job listings" icon="🕒" onClick={() => setView('part-time')} />
            <MenuButton title="Premium Careers" description="Access exclusive professional paths" icon="✨" disabled />
        </div>
    );
};

const PartTimeJobsContent: React.FC<{ character: Character; onApplyForJob: (job: Job) => void }> = ({ character, onApplyForJob }) => {
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        const { jobs: availableJobs } = getAvailableJobs(character);
        const partTimeJobs = availableJobs.filter(j => j.type === 'part-time');
        setJobs(partTimeJobs);
    }, [character]);
    
    if (jobs.length === 0) {
        return <p className="text-stone-500 mt-4 text-center">No part-time jobs available for you right now.</p>;
    }

    return (
        <div className="space-y-3 mt-4 max-h-[60vh] overflow-y-auto pr-2">
            {jobs.map((job, index) => (
                <div key={index} className="bg-stone-100 p-4 rounded-lg flex justify-between items-center animate-fade-in border border-stone-200">
                    <div>
                        <h3 className="font-bold text-lg text-green-700">{job.title}</h3>
                        <p className="text-sm text-stone-500">{job.description}</p>
                        <p className="font-semibold text-stone-800 mt-1">Salary: {character.currency.symbol}{job.salary.toLocaleString()}/month</p>
                    </div>
                    <button onClick={() => onApplyForJob(job)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition whitespace-nowrap ml-4 shadow-sm">
                        Apply
                    </button>
                </div>
            ))}
        </div>
    );
};

const EducationContent: React.FC<{ character: Character }> = ({ character }) => {
    const isStudying = ['Preschool', 'Elementary School', 'Middle School', 'High School', 'University', 'Medical School', 'Law School'].includes(character.occupation);

    const handleAction = (action: string) => {
        alert(`${action} is coming soon!`);
    };

    return (
        <div className="mt-4">
            {isStudying ? (
                <div className="text-center">
                    <p className="text-lg text-stone-600 mb-4">You are currently enrolled in: <span className="font-bold">{character.occupation}</span></p>
                    <div className="space-y-3">
                        <button onClick={() => handleAction('Study harder')} className="w-full max-w-sm mx-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition">Study Harder</button>
                        <button onClick={() => handleAction('Drop out')} className="w-full max-w-sm mx-auto bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition">Drop Out</button>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-lg text-stone-600 mb-4">What would you like to study?</p>
                    <div className="space-y-3">
                        <button onClick={() => handleAction('Community College')} className="w-full max-w-sm mx-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition">Enroll in Community College</button>
                        <button onClick={() => handleAction('University')} className="w-full max-w-sm mx-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition">Apply to University</button>
                        <button onClick={() => handleAction('Vocational School')} className="w-full max-w-sm mx-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition">Attend Vocational School</button>
                    </div>
                </div>
            )}
        </div>
    );
};


// --- Main Screen Component ---

const JobScreen: React.FC<JobScreenProps> = ({ character, onApplyForJob, onBack }) => {
    const [view, setView] = useState<JobView>('main');

    const handleBack = () => {
        if (view === 'main') {
            onBack();
        } else {
            setView('main');
        }
    };
    
    const getTitle = () => {
        switch(view) {
            case 'education': return 'Education';
            case 'part-time': return 'Part-Time Jobs';
            case 'main':
            default: return 'Career Center';
        }
    };

    const backButtonText = view === 'main' ? 'Back to Game' : 'Back to Career Center';
    
    const renderContent = () => {
        switch (view) {
            case 'education':
                return <EducationContent character={character} />;
            case 'part-time':
                return <PartTimeJobsContent character={character} onApplyForJob={onApplyForJob} />;
            case 'main':
            default:
                return <MainMenuContent setView={setView} />;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-2xl relative">
                <button onClick={handleBack} className="absolute top-4 left-4 text-stone-500 hover:text-stone-800 transition">&larr; {backButtonText}</button>
                <h1 className="text-3xl font-extrabold text-stone-800 mb-6 text-center mt-8">{getTitle()}</h1>
                {renderContent()}
            </div>
        </div>
    );
};

export default JobScreen;