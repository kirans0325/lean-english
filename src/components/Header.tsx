import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';

interface HeaderProps {
  onOpenProfile?: () => void;
  onOpenAdminConsole?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenProfile, onOpenAdminConsole }) => {
  const { user, isAdmin } = useAuth();
  const { xpPoints, streakDays } = useProgress();

  return (
    <View style={styles.headerBox}>
      {/* Top Greeting Row - Hamburger Icon Removed */}
      <View style={styles.topRow}>
        <View style={styles.greetingLeft}>
          <View>
            <View style={styles.nameRow}>
              <Text style={styles.greetingText}>Hello, {user?.name || 'English Learner'}! 👋</Text>
              {isAdmin && (
                <View style={styles.adminBadge}>
                  <Text style={styles.adminBadgeText}>ADMIN</Text>
                </View>
              )}
            </View>
            <Text style={styles.subGreeting}>Let's make today a great learning day.</Text>
          </View>
        </View>

        <View style={styles.topRight}>
          {/* Admin Console Quick Launch Button */}
          {isAdmin && onOpenAdminConsole && (
            <TouchableOpacity onPress={onOpenAdminConsole} style={styles.adminConsoleBtn}>
              <Text style={styles.adminConsoleBtnText}>👑 Admin Console</Text>
            </TouchableOpacity>
          )}

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
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  greetingText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  adminBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  adminBadgeText: {
    color: '#000',
    fontSize: 9,
    fontWeight: '900',
  },
  subGreeting: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  adminConsoleBtn: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  adminConsoleBtnText: {
    color: '#000',
    fontWeight: '900',
    fontSize: 11,
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
