import React from 'react';
import { WelcomeDashboard } from './WelcomeDashboard';
import { Calculator } from './Calculator';
import { Profile } from './Profile';
import { Results } from './Results';
import { useAuth } from '../hooks/useAuth';
import { EmissionResults, FormData } from '../types';

interface MainProps {
    currentPage: string;
    onNavigate: (page: string) => void;
    results: EmissionResults | null;
    formData: FormData | null;
    onCalculationComplete: (data: FormData, results: EmissionResults) => void;
}

export const Main: React.FC<MainProps> = ({ currentPage, onNavigate, results, formData, onCalculationComplete }) => {
    const { user } = useAuth();
    
    const renderContent = () => {
        switch (currentPage) {
            case 'dashboard':
                if (results && formData) {
                    return <Results results={results} formData={formData} onStartNew={() => onNavigate('calculator')} />;
                }
                // Fallback if results are not available
                return <WelcomeDashboard user={user} onStart={() => onNavigate('calculator')} />;
            case 'calculator':
                return <Calculator onCalculationComplete={onCalculationComplete} />;
            case 'profile':
                return <Profile />;
            case 'welcome':
            default:
                return <WelcomeDashboard user={user} onStart={() => onNavigate('calculator')} />;
        }
    };

    return (
        <main className="main-content">
            {renderContent()}
        </main>
    );
};
