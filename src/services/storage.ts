import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, SpokenHistoryRecord } from '../types';

const STORAGE_KEYS = {
  USER_PROFILE: '@fluentai_user_profile',
  AUTH_TOKEN: '@fluentai_auth_token',
  USER_PROGRESS: '@fluentai_user_progress',
  SPOKEN_HISTORY: '@fluentai_spoken_history',
  BOOKMARKS: '@fluentai_bookmarks',
};

export class StorageService {
  // Save User Profile
  static async saveUser(user: UserProfile, token?: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(user));
      if (token) {
        await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      }
    } catch (e) {
      console.error('Error saving user profile to storage:', e);
    }
  }

  // Get User Profile
  static async getUser(): Promise<{ user: UserProfile | null; token: string | null }> {
    try {
      const userStr = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const user = userStr ? JSON.parse(userStr) : null;
      return { user, token };
    } catch (e) {
      return { user: null, token: null };
    }
  }

  // Clear Session (Logout)
  static async clearSession(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (e) {}
  }

  // Spoken History Storage
  static async getSpokenHistory(): Promise<SpokenHistoryRecord[]> {
    try {
      const historyStr = await AsyncStorage.getItem(STORAGE_KEYS.SPOKEN_HISTORY);
      return historyStr ? JSON.parse(historyStr) : [];
    } catch (e) {
      return [];
    }
  }

  static async saveSpokenRecord(record: SpokenHistoryRecord): Promise<SpokenHistoryRecord[]> {
    try {
      const current = await this.getSpokenHistory();
      const updated = [record, ...current].slice(0, 50); // keep last 50
      await AsyncStorage.setItem(STORAGE_KEYS.SPOKEN_HISTORY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      return [];
    }
  }
}
