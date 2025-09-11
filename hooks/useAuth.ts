import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { User } from '../types';

// This custom hook provides the full authentication logic.
export const useAuthHook = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for an active session on initial load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('carbon-calc-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (data: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // Simulate network delay
          const users = JSON.parse(localStorage.getItem('carbon-calc-users') || '[]');
          const foundUser = users.find((u: any) => u.email === data.email && u.password === data.password);
          
          if (foundUser) {
            const userToStore = { name: foundUser.name, email: foundUser.email };
            localStorage.setItem('carbon-calc-user', JSON.stringify(userToStore));
            setUser(userToStore);
            resolve();
          } else {
            reject(new Error('Invalid email or password.'));
          }
      }, 500);
    });
  };

  const signup = (data: any): Promise<void> => {
     return new Promise((resolve, reject) => {
      setTimeout(() => { // Simulate network delay
        const users = JSON.parse(localStorage.getItem('carbon-calc-users') || '[]');
        const existingUser = users.find((u: any) => u.email === data.email);

        if (existingUser) {
          reject(new Error('An account with this email already exists.'));
        } else {
          const newUser = { name: data.name, email: data.email, password: data.password };
          users.push(newUser);
          localStorage.setItem('carbon-calc-users', JSON.stringify(users));
          resolve();
        }
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem('carbon-calc-user');
    setUser(null);
  };
  
  return { user, login, signup, logout, loading };
};

// This hook is a simple consumer for the context.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
