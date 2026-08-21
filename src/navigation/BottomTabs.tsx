import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export type TabScreenName =
  | 'Home'
  | 'PhaseLessons'
  | 'Stories'
  | 'OneMinuteSprint'
  | 'MediaHub'
  | 'DailyConversation'
  | 'SpeakingLab'
  | 'Profile';

interface BottomTabsProps {
  currentTab: TabScreenName;
  onTabChange: (tab: TabScreenName) => void;
}

export const BottomTabs: React.FC<BottomTabsProps> = ({ currentTab, onTabChange }) => {
  const tabs: { name: TabScreenName; label: string; icon: string }[] = [
    { name: 'Home', label: 'Home', icon: '🏠' },
    { name: 'PhaseLessons', label: 'Curriculum', icon: '📚' },
    { name: 'Stories', label: 'Stories', icon: '📖' },
    { name: 'OneMinuteSprint', label: '1-Min Sprint', icon: '⏱️' },
    { name: 'DailyConversation', label: 'Roleplay', icon: '🗣️' },
    { name: 'SpeakingLab', label: 'Speaking', icon: '🎙️' },
    { name: 'Profile', label: 'History', icon: '📊' },
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
            <Text style={styles.icon}>{tab.icon}</Text>
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
    backgroundColor: colors.cardBg,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    paddingVertical: 8,
    paddingHorizontal: 2,
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  activeTabItem: {
    backgroundColor: colors.primaryDark,
  },
  icon: {
    fontSize: 16,
  },
  label: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
  },
  activeLabel: {
    color: '#FFF',
    fontWeight: '900',
  },
});
