import React from 'react';
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

interface HomeScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const { user, setPhase } = useAuth();
  const { xpPoints, streakDays } = useProgress();

  const phaseCards: { phase: LearningPhase; title: string; desc: string; icon: string; color: string }[] = [
    {
      phase: 'basics',
      title: 'Basics Phase',
      desc: 'Phonetics, 1000 essential words, greetings & core grammar.',
      icon: '🌱',
      color: colors.basics,
    },
    {
      phase: 'intermediate',
      title: 'Intermediate Phase',
      desc: 'Idioms, phrasal verbs, complex sentence fluency & stories.',
      icon: '🚀',
      color: colors.intermediate,
    },
    {
      phase: 'advanced',
      title: 'Advanced Phase',
      desc: 'Rhetoric, literature breakdowns, debate & formal speeches.',
      icon: '🎓',
      color: colors.advanced,
    },
    {
      phase: 'business',
      title: 'Business English',
      desc: 'Corporate emails, job interviews, meetings & negotiations.',
      icon: '💼',
      color: colors.business,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Daily Progress Banner */}
      <View style={styles.banner}>
        <View>
          <Text style={styles.bannerGreeting}>Welcome back, {user?.name}!</Text>
          <Text style={styles.bannerSub}>Daily Goal: 15 mins • Active Phase: {user?.phase.toUpperCase()}</Text>
        </View>
        <View style={styles.bannerRing}>
          <Text style={styles.ringText}>🔥 {streakDays}</Text>
          <Text style={styles.ringSub}>Days</Text>
        </View>
      </View>

      {/* Quick Launch Interactive Modules */}
      <Text style={styles.sectionTitle}>Interactive Learning Modules</Text>
      <View style={styles.quickGrid}>
        <TouchableOpacity
          style={[styles.quickCard, { backgroundColor: '#1E1B4B' }]}
          onPress={() => onNavigate('DailyConversation')}
        >
          <Text style={styles.quickIcon}>🗣️</Text>
          <Text style={styles.quickTitle}>Daily Roleplay (Lady & Male Voices)</Text>
          <Text style={styles.quickSub}>Turn-by-turn coffee, interview & travel chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.quickCard, { backgroundColor: '#831843' }]}
          onPress={() => onNavigate('Stories')}
        >
          <Text style={styles.quickIcon}>📖</Text>
          <Text style={styles.quickTitle}>Read & Practice Stories</Text>
          <Text style={styles.quickSub}>Full-length stories narrated by female/male voices</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.quickCard, { backgroundColor: '#701A75' }]}
          onPress={() => onNavigate('OneMinuteSprint')}
        >
          <Text style={styles.quickIcon}>⏱️</Text>
          <Text style={styles.quickTitle}>1-Minute Speech Sprint</Text>
          <Text style={styles.quickSub}>60-second continuous speaking challenge & WPM fluency rate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.quickCard, { backgroundColor: '#064E3B' }]}
          onPress={() => onNavigate('SpeakingLab')}
        >
          <Text style={styles.quickIcon}>🎙️</Text>
          <Text style={styles.quickTitle}>Pronunciation Checker Lab</Text>
          <Text style={styles.quickSub}>Real-time voice check & accuracy scoring</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.quickCard, { backgroundColor: '#312E81' }]}
          onPress={() => onNavigate('MediaHub')}
        >
          <Text style={styles.quickIcon}>🎬</Text>
          <Text style={styles.quickTitle}>Movies & News Clips</Text>
          <Text style={styles.quickSub}>Film scene dialogue & simplified daily news</Text>
        </TouchableOpacity>
      </View>

      {/* Learning Phases Grid */}
      <Text style={styles.sectionTitle}>Choose Learning Phase</Text>
      {phaseCards.map((card) => {
        const isActive = user?.phase === card.phase;
        return (
          <TouchableOpacity
            key={card.phase}
            style={[
              styles.phaseCard,
              { borderColor: card.color },
              isActive && { backgroundColor: '#1E293B', borderWidth: 2 },
            ]}
            onPress={() => {
              setPhase(card.phase);
              onNavigate('PhaseLessons', { phase: card.phase });
            }}
          >
            <View style={[styles.phaseIconBg, { backgroundColor: card.color }]}>
              <Text style={styles.phaseIconText}>{card.icon}</Text>
            </View>
            <View style={styles.phaseInfo}>
              <View style={styles.phaseHeaderRow}>
                <Text style={styles.phaseTitle}>{card.title}</Text>
                {isActive && (
                  <View style={[styles.activeBadge, { backgroundColor: card.color }]}>
                    <Text style={styles.activeBadgeText}>ACTIVE</Text>
                  </View>
                )}
              </View>
              <Text style={styles.phaseDesc}>{card.desc}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  banner: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  bannerGreeting: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  bannerSub: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  bannerRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0F172A',
    borderWidth: 2,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  ringSub: {
    color: colors.textMuted,
    fontSize: 9,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
    marginTop: 4,
  },
  quickGrid: {
    gap: 10,
    marginBottom: 24,
  },
  quickCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  quickIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  quickTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  quickSub: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  phaseCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  phaseIconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  phaseIconText: {
    fontSize: 22,
  },
  phaseInfo: {
    flex: 1,
  },
  phaseHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  phaseTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  activeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  activeBadgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '900',
  },
  phaseDesc: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 3,
  },
});
