import React, { createContext, useContext, useState, useEffect } from 'react';
import { SpokenHistoryRecord } from '../types';
import { StorageService } from '../services/storage';

interface ProgressContextType {
  xpPoints: number;
  streakDays: number;
  completedLessons: string[];
  spokenHistory: SpokenHistoryRecord[];
  addXP: (amount: number) => void;
  markLessonComplete: (lessonId: string, xpEarned: number) => void;
  addSpokenRecord: (record: SpokenHistoryRecord) => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [xpPoints, setXpPoints] = useState<number>(140);
  const [streakDays, setStreakDays] = useState<number>(4);
  const [completedLessons, setCompletedLessons] = useState<string[]>(['basic-1']);
  const [spokenHistory, setSpokenHistory] = useState<SpokenHistoryRecord[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const history = await StorageService.getSpokenHistory();
    setSpokenHistory(history);
  };

  const addXP = (amount: number) => {
    setXpPoints((prev) => prev + amount);
  };

  const markLessonComplete = (lessonId: string, xpEarned: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons((prev) => [...prev, lessonId]);
      addXP(xpEarned);
    }
  };

  const addSpokenRecord = async (record: SpokenHistoryRecord) => {
    const updated = await StorageService.saveSpokenRecord(record);
    setSpokenHistory(updated);
    addXP(15); // Reward 15 XP per speaking practice drill
  };

  return (
    <ProgressContext.Provider
      value={{
        xpPoints,
        streakDays,
        completedLessons,
        spokenHistory,
        addXP,
        markLessonComplete,
        addSpokenRecord,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
