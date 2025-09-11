import React, { useState } from 'react';

interface ForgotPasswordProps {
    onShowLogin: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onShowLogin }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Password reset requested for ${email}`);
    setSubmitted(true);
  };

  return (
    <div className="auth-container">
       <div className="card auth-card">
            <h1 className="form-title">Reset Password</h1>
            {submitted ? (
                 <div className="form-content" style={{gap: 0}}>
                    <p className="form-subtitle" style={{textAlign: 'center', marginBottom: '1rem'}}>If an account with that email exists, a password reset link has been sent.</p>
                    <div className="button-group" style={{marginTop: '1rem'}}>
                        <button type="button" onClick={onShowLogin} className="btn btn-primary" style={{width: '100%'}}>Back to Login</button>
                    </div>
                </div>
            ) : (
                <>
                    <p className="form-subtitle">Enter your email to receive a reset link.</p>
                    <form onSubmit={handleSubmit} className="form-content">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required />
                        </div>
                        <div className="button-group">
                            <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Send Reset Link</button>
                        </div>
                         <div className="auth-links">
                            <p><button type="button" onClick={onShowLogin} className="link-button">Back to Login</button></p>
                        </div>
                    </form>
                </>
            )}
       </div>
    </div>
  );
};

export default ForgotPassword;
