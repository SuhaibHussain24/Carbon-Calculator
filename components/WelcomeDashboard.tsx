import React from 'react';
import { User } from '../types';

interface WelcomeDashboardProps {
  onStart: () => void;
  user: User | null;
}

export const WelcomeDashboard: React.FC<WelcomeDashboardProps> = ({ onStart, user }) => {
  return (
    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 className="form-title" style={{border: 0, fontSize: '2rem'}}>Welcome, {user?.name || 'Guest'}!</h1>
      <p className="form-subtitle" style={{maxWidth: '600px', margin: '1rem auto 2rem'}}>
        Ready to take the first step towards a more sustainable future?
        Our calculator will help you understand your company's carbon footprint across Scope 1, 2, and 3 emissions.
      </p>
      <div className="button-group">
        <button onClick={onStart} className="btn btn-primary btn-lg">
          Start New Calculation
        </button>
      </div>
      <div style={{marginTop: '3rem'}}>
        <h3>Why is this important?</h3>
        <p style={{maxWidth: '700px', margin: '1rem auto'}}>
            Measuring your carbon footprint is the essential first step to managing and reducing it. Understanding your emissions helps you identify inefficiencies, reduce costs, comply with regulations, and enhance your brand's reputation as an environmentally responsible leader.
        </p>
      </div>
    </div>
  );
};
