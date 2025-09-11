import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepName: string;
}

const stepTitles: { [key: string]: string } = {
    industry: 'Company Information',
    scope1: 'Scope 1: Direct Emissions',
    scope2: 'Scope 2: Indirect Emissions',
    scope3: 'Scope 3: Value Chain Emissions',
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, stepName }) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-bar-container">
        <div className="progress-bar-header">
            <span>{stepTitles[stepName] || 'Step'}</span>
            <span>Step {currentStep} of {totalSteps}</span>
        </div>
        <div className="progress-bar-bg">
            <div className="progress-bar-fg" style={{ width: `${percentage}%` }}></div>
        </div>
    </div>
  );
};
