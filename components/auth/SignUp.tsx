import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface SignUpProps {
  onShowLogin: () => void;
  onSignupSuccess: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onShowLogin, onSignupSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await signup({ name, email, password });
      onSignupSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to sign up.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <h1 className="form-title">Create Account</h1>
        <p className="form-subtitle">Start calculating your carbon footprint today.</p>
        <form onSubmit={handleSubmit} className="form-content">
          {error && <p className="error-message auth-error">{error}</p>}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Minimum 6 characters" required />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary" disabled={loading} style={{width: '100%'}}>
                {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
          <div className="auth-links">
            <p>Already have an account? <button type="button" onClick={onShowLogin} className="link-button">Log In</button></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
