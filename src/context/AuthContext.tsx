import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, LearningPhase } from '../types';
import { StorageService } from '../services/storage';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, name?: string) => Promise<void>;
  register: (name: string, email: string, phase: LearningPhase) => Promise<void>;
  logout: () => Promise<void>;
  setPhase: (phase: LearningPhase) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>({
    id: 1,
    name: 'English Learner',
    email: 'learner@example.com',
    phase: 'basics',
    daily_goal: 15,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadUserSession();
  }, []);

  const loadUserSession = async () => {
    try {
      const { user: storedUser } = await StorageService.getUser();
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (e) {
      console.error('Session restore error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, name?: string) => {
    const newUser: UserProfile = {
      id: Date.now(),
      name: name || email.split('@')[0],
      email,
      phase: user?.phase || 'basics',
      daily_goal: 15,
    };
    setUser(newUser);
    await StorageService.saveUser(newUser, 'mock_token_neon_db');
  };

  const register = async (name: string, email: string, phase: LearningPhase) => {
    const newUser: UserProfile = {
      id: Date.now(),
      name,
      email,
      phase,
      daily_goal: 15,
    };
    setUser(newUser);
    await StorageService.saveUser(newUser, 'mock_token_neon_db');
  };

  const logout = async () => {
    setUser(null);
    await StorageService.clearSession();
  };

  const setPhase = async (phase: LearningPhase) => {
    if (user) {
      const updated = { ...user, phase };
      setUser(updated);
      await StorageService.saveUser(updated);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        setPhase,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
