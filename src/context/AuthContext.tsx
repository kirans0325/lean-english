import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, LearningPhase, VoiceGender } from '../types';
import { StorageService } from '../services/storage';
import { SpeechEngine } from '../services/speech';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, name?: string) => Promise<void>;
  register: (name: string, email: string, phase: LearningPhase) => Promise<void>;
  logout: () => Promise<void>;
  setPhase: (phase: LearningPhase) => void;
  setDefaultGender: (gender: VoiceGender) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>({
    id: 1,
    name: 'English Learner',
    email: 'learner@example.com',
    phase: 'basics',
    daily_goal: 15,
    default_gender: 'female',
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
        if (storedUser.default_gender) {
          SpeechEngine.setDefaultGender(storedUser.default_gender);
        }
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
      default_gender: 'female',
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
      default_gender: 'female',
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

  const setDefaultGender = async (gender: VoiceGender) => {
    if (user) {
      const updated = { ...user, default_gender: gender };
      setUser(updated);
      SpeechEngine.setDefaultGender(gender);
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
        setDefaultGender,
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
