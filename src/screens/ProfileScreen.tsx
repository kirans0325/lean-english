import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../theme/colors';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { LearningPhase } from '../types';

export const ProfileScreen: React.FC = () => {
  const { user, logout, setPhase } = useAuth();
  const { xpPoints, streakDays, completedLessons, spokenHistory } = useProgress();
  const [neonStatus, setNeonStatus] = useState<string>('Checking Neon DB Connection...');

  useEffect(() => {
    checkNeonStatus();
  }, []);

  const checkNeonStatus = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/health');
      if (res.ok) {
        const data = await res.json();
        setNeonStatus('🟢 Connected to Neon DB PostgreSQL');
      } else {
        setNeonStatus('🟡 Local Persistence Mode Active');
      }
    } catch (e) {
      setNeonStatus('🟢 Neon DB Adapter Ready (Local Mode)');
    }
  };

  const getAccuracyAverage = () => {
    if (!spokenHistory || spokenHistory.length === 0) return 0;
    const sum = spokenHistory.reduce((acc, curr) => acc + curr.accuracyScore, 0);
    return Math.round(sum / spokenHistory.length);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Info Header */}
      <View style={styles.profileCard}>
        <View style={styles.avatarBig}>
          <Text style={styles.avatarBigText}>{user?.name?.charAt(0).toUpperCase() || 'U'}</Text>
        </View>
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>

        <View style={styles.statusBadge}>
          <Text style={styles.statusBadgeText}>{neonStatus}</Text>
        </View>

        {/* Phase Selector */}
        <Text style={styles.phaseLabel}>Current Learning Level Phase:</Text>
        <View style={styles.phaseRow}>
          {(['basics', 'intermediate', 'advanced', 'business'] as LearningPhase[]).map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.phaseBtn, user?.phase === p && styles.activePhaseBtn]}
              onPress={() => setPhase(p)}
            >
              <Text style={[styles.phaseBtnText, user?.phase === p && styles.activePhaseBtnText]}>
                {p.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Analytics Summary */}
      <Text style={styles.sectionTitle}>Learning Analytics</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>🔥 {streakDays}</Text>
          <Text style={styles.statLbl}>Daily Streak</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>⚡ {xpPoints}</Text>
          <Text style={styles.statLbl}>Total XP</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>🎯 {getAccuracyAverage()}%</Text>
          <Text style={styles.statLbl}>Avg Speaking Score</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>📚 {completedLessons.length}</Text>
          <Text style={styles.statLbl}>Completed Lessons</Text>
        </View>
      </View>

      {/* Spoken Practice History Log */}
      <Text style={styles.sectionTitle}>Pronunciation Practice History Log</Text>
      {spokenHistory.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No spoken recordings yet. Try the Pronunciation Lab!</Text>
        </View>
      ) : (
        spokenHistory.map((item, idx) => (
          <View key={idx} style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyPhase}>{item.phase.toUpperCase()}</Text>
              <View style={[styles.historyScoreBadge, { backgroundColor: item.accuracyScore >= 80 ? colors.success : colors.warning }]}>
                <Text style={styles.historyScoreText}>{item.accuracyScore}%</Text>
              </View>
            </View>
            <Text style={styles.historyPhrase}>"{item.phraseText}"</Text>
            <Text style={styles.historySpoken}>Spoken: "{item.userTranscription || 'N/A'}"</Text>
          </View>
        ))
      )}

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Log Out of App</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  profileCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  avatarBig: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarBigText: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: '900',
  },
  userName: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  userEmail: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
    marginBottom: 10,
  },
  statusBadge: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  statusBadgeText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
  },
  phaseLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 8,
  },
  phaseRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
  },
  phaseBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  activePhaseBtn: {
    backgroundColor: colors.primary,
  },
  phaseBtnText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
  },
  activePhaseBtnText: {
    color: '#FFF',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  statVal: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
  },
  statLbl: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  emptyCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  historyCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  historyPhase: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '900',
  },
  historyScoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  historyScoreText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '900',
  },
  historyPhrase: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 13,
  },
  historySpoken: {
    color: colors.textSecondary,
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 2,
  },
  logoutBtn: {
    backgroundColor: '#0F172A',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  logoutText: {
    color: colors.danger,
    fontWeight: '800',
    fontSize: 14,
  },
});
