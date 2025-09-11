import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface LoginProps {
  onShowSignUp: () => void;
  onShowForgotPassword: () => void;
}

export const Login: React.FC<LoginProps> = ({ onShowSignUp, onShowForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      // The parent App component will handle showing the main app
    } catch (err: any) {
      setError(err.message || 'Failed to log in.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <h1 className="form-title">Welcome Back</h1>
        <p className="form-subtitle">Log in to access your dashboard.</p>
        <form onSubmit={handleSubmit} className="form-content">
          {error && <p className="error-message auth-error">{error}</p>}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary" disabled={loading} style={{width: '100%'}}>
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </div>
          <div className="auth-links">
            <button type="button" onClick={onShowForgotPassword} className="link-button">Forgot password?</button>
            <p>Don't have an account? <button type="button" onClick={onShowSignUp} className="link-button">Sign Up</button></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
