import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export type TabScreenName =
  | 'Home'
  | 'PhaseLessons'
  | 'GrammarSection'
  | 'SpeakingLab'
  | 'Stories'
  | 'OneMinuteSprint'
  | 'MediaHub'
  | 'DailyConversation'
  | 'Profile';

interface BottomTabsProps {
  currentTab: TabScreenName;
  onTabChange: (tab: TabScreenName) => void;
}

export const BottomTabs: React.FC<BottomTabsProps> = ({ currentTab, onTabChange }) => {
  const tabs: { name: TabScreenName; label: string; icon: string }[] = [
    { name: 'Home', label: 'Home', icon: '🏠' },
    { name: 'PhaseLessons', label: 'Learn', icon: '📖' },
    { name: 'GrammarSection', label: 'Grammar', icon: '📘' },
    { name: 'SpeakingLab', label: 'Practice', icon: '🎙️' },
    { name: 'Stories', label: 'Progress', icon: '📊' },
    { name: 'Profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <View style={styles.navBar}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={[styles.tabItem, isActive && styles.activeTabItem]}
            onPress={() => onTabChange(tab.name)}
          >
            <Text style={[styles.icon, isActive && styles.activeIcon]}>{tab.icon}</Text>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#0C101D',
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  activeTabItem: {
    backgroundColor: '#1E1B4B',
  },
  icon: {
    fontSize: 18,
    opacity: 0.6,
  },
  activeIcon: {
    opacity: 1,
  },
  label: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  activeLabel: {
    color: colors.primary,
    fontWeight: '900',
  },
});
