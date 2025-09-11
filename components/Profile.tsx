import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const Profile: React.FC = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return <p>You are not logged in.</p>;
    }

    return (
        <div className="card" style={{padding: '2rem', maxWidth: '600px', margin: 'auto'}}>
            <h2 className="form-title" style={{textAlign: 'center', border: 0, fontSize: '1.8rem', marginBottom: '2rem'}}>
                User Profile
            </h2>
            <div className="form-group">
                <label>Name</label>
                <p style={{ fontSize: '1.1rem' }}>{user.name}</p>
            </div>
            <div className="form-group">
                <label>Email</label>
                <p style={{ fontSize: '1.1rem' }}>{user.email}</p>
            </div>
            <div className="button-group" style={{marginTop: '2rem'}}>
                <button onClick={logout} className="btn btn-secondary" style={{width: '100%'}}>
                    Log Out
                </button>
            </div>
        </div>
    );
};
