import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, LearningPhase, VoiceGender, UserRole } from '../types';
import { StorageService } from '../services/storage';
import { SpeechEngine } from '../services/speech';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, name?: string) => Promise<void>;
  register: (name: string, email: string, phase: LearningPhase) => Promise<void>;
  logout: () => Promise<void>;
  setPhase: (phase: LearningPhase) => void;
  setDefaultGender: (gender: VoiceGender) => void;
  updateUserRole: (userId: number, newRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>({
    id: 999,
    name: 'App Administrator',
    email: 'admin@fluentai.com',
    phase: 'business',
    daily_goal: 30,
    role: 'admin',
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
    const isAdminUser = email.toLowerCase().includes('admin') || email === 'admin@fluentai.com';
    const newUser: UserProfile = {
      id: isAdminUser ? 999 : Date.now(),
      name: name || (isAdminUser ? 'App Administrator' : email.split('@')[0]),
      email,
      phase: 'basics',
      daily_goal: 15,
      role: isAdminUser ? 'admin' : 'user',
      default_gender: 'female',
    };
    setUser(newUser);
    await StorageService.saveUser(newUser, 'mock_token_neon_db');
  };

  const register = async (name: string, email: string, phase: LearningPhase) => {
    const isAdminUser = email.toLowerCase().includes('admin') || email === 'admin@fluentai.com';
    const newUser: UserProfile = {
      id: isAdminUser ? 999 : Date.now(),
      name,
      email,
      phase,
      daily_goal: 15,
      role: isAdminUser ? 'admin' : 'user',
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

  const updateUserRole = async (userId: number, newRole: UserRole) => {
    if (user && user.id === userId) {
      const updated = { ...user, role: newRole };
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
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        setPhase,
        setDefaultGender,
        updateUserRole,
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
