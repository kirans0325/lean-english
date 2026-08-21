import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';

interface HeaderProps {
  onOpenProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenProfile }) => {
  const { user } = useAuth();
  const { xpPoints, streakDays } = useProgress();

  return (
    <View style={styles.headerBox}>
      {/* Top Greeting Row */}
      <View style={styles.topRow}>
        <View style={styles.greetingLeft}>
          <Text style={styles.menuIcon}>☰</Text>
          <View>
            <Text style={styles.greetingText}>Hello, {user?.name || 'English Learner'}! 👋</Text>
            <Text style={styles.subGreeting}>Let's make today a great learning day.</Text>
          </View>
        </View>

        <View style={styles.topRight}>
          <TouchableOpacity style={styles.bellBtn}>
            <Text style={styles.bellIcon}>🔔</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onOpenProfile} style={styles.avatarBtn}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase() || 'E'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Cards Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>🔥</Text>
          <View>
            <Text style={styles.statVal}>{streakDays}</Text>
            <Text style={styles.statLbl}>Day Streak</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>⚡</Text>
          <View>
            <Text style={styles.statVal}>{xpPoints} XP</Text>
            <Text style={styles.statLbl}>Total XP</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBox: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  greetingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIcon: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  greetingText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  subGreeting: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bellBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  bellIcon: {
    fontSize: 16,
  },
  avatarBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 6,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  statEmoji: {
    fontSize: 20,
    marginRight: 10,
  },
  statVal: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  statLbl: {
    color: colors.textSecondary,
    fontSize: 10,
  },
});
