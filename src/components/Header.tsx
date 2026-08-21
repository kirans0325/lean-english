import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { LearningPhase } from '../types';

interface HeaderProps {
  onOpenProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenProfile }) => {
  const { user, setPhase } = useAuth();
  const { xpPoints, streakDays } = useProgress();

  const getPhaseColor = (phase?: LearningPhase) => {
    switch (phase) {
      case 'basics': return colors.basics;
      case 'intermediate': return colors.intermediate;
      case 'advanced': return colors.advanced;
      case 'business': return colors.business;
      default: return colors.primary;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onOpenProfile} style={styles.userInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase() || 'U'}</Text>
        </View>
        <View>
          <Text style={styles.userName}>{user?.name || 'Learner'}</Text>
          <View style={[styles.phaseBadge, { backgroundColor: getPhaseColor(user?.phase) }]}>
            <Text style={styles.phaseBadgeText}>{user?.phase?.toUpperCase() || 'BASICS'}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.statsContainer}>
        {/* Streak Counter */}
        <View style={styles.statBadge}>
          <Text style={styles.statIcon}>🔥</Text>
          <Text style={styles.statText}>{streakDays} d</Text>
        </View>

        {/* XP Counter */}
        <View style={[styles.statBadge, styles.xpBadge]}>
          <Text style={styles.statIcon}>⚡</Text>
          <Text style={styles.xpText}>{xpPoints} XP</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  phaseBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  phaseBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  xpBadge: {
    borderColor: colors.accent,
  },
  statIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  statText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  xpText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '800',
  },
});
