import React, { createContext, ReactNode } from 'react';
import { useAuthHook } from '../hooks/useAuth';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (data: any) => Promise<void>;
  logout: () => void;
  signup: (data: any) => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthHook();
  
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
