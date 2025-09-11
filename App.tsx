import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { Login } from './components/auth/Login';
import { SignUp } from './components/auth/SignUp';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { Sidebar } from './components/Sidebar';
import { Main } from './components/Dashboard';
import { EmissionResults, FormData } from './types';

type AuthView = 'login' | 'signup' | 'forgot_password';

function App() {
  const { user, loading } = useAuth();
  const [authView, setAuthView] = useState<AuthView>('login');
  const [currentPage, setCurrentPage] = useState('welcome');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [results, setResults] = useState<EmissionResults | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  
  useEffect(() => {
    if (user) {
      try {
        const storedResults = localStorage.getItem(`results_${user.email}`);
        const storedFormData = localStorage.getItem(`formData_${user.email}`);
        if (storedResults && storedFormData) {
          setResults(JSON.parse(storedResults));
          setFormData(JSON.parse(storedFormData));
          setCurrentPage('dashboard');
        }
      } catch (error) {
        console.error("Failed to parse stored data", error);
      }
    }
  }, [user]);

  const handleNavigate = (page: string) => {
      if (page === 'calculator') {
        // When starting a new calculation, clear old results
        setResults(null);
        setFormData(null);
        if (user) {
          localStorage.removeItem(`results_${user.email}`);
          localStorage.removeItem(`formData_${user.email}`);
        }
      }
      setCurrentPage(page);
  };
  
  const handleCalculationComplete = (data: FormData, calcResults: EmissionResults) => {
    if (user) {
      setFormData(data);
      setResults(calcResults);
      localStorage.setItem(`formData_${user.email}`, JSON.stringify(data));
      localStorage.setItem(`results_${user.email}`, JSON.stringify(calcResults));
      setCurrentPage('dashboard');
    }
  };

  if (loading) {
    return <div className="loading-screen"><div className="spinner"></div></div>;
  }
  
  if (!user) {
    // Auth screens logic remains the same
    if (signupSuccess) {
           return (
              <div className="auth-container">
                <div className="card auth-card">
                    <h1 className="form-title">Account Created!</h1>
                    <p className="form-subtitle">Please log in to continue.</p>
                    <div className="button-group" style={{marginTop: '1rem'}}>
                         <button onClick={() => { setSignupSuccess(false); setAuthView('login'); }} className="btn btn-primary" style={{width: '100%'}}>Go to Login</button>
                    </div>
                </div>
            </div>
           );
      }

      switch(authView) {
        case 'signup':
          return <SignUp onShowLogin={() => setAuthView('login')} onSignupSuccess={() => setSignupSuccess(true)} />;
        case 'forgot_password':
            return <ForgotPassword onShowLogin={() => setAuthView('login')} />;
        case 'login':
        default:
          return <Login onShowSignUp={() => setAuthView('signup')} onShowForgotPassword={() => setAuthView('forgot_password')} />;
      }
  }

  return (
    <div className="app-container">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      <Main 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        results={results}
        formData={formData}
        onCalculationComplete={handleCalculationComplete}
      />
    </div>
  );
}

export default App;