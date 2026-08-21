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
  const { xpPoints, streakDays, completedLessons, spokenHistory } = useProgress();

  const daysOfWeek = [
    { day: 'Mon', done: true },
    { day: 'Tue', done: true },
    { day: 'Wed', done: true },
    { day: 'Thu', done: true, isFlame: true },
    { day: 'Fri', done: false },
    { day: 'Sat', done: false },
    { day: 'Sun', done: false },
  ];

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
      {/* 🎯 TODAY'S GOAL FEATURED CARD */}
      <View style={styles.goalCard}>
        <View style={styles.goalTopRow}>
          <View style={styles.goalTitleGroup}>
            <View style={styles.goalIconBadge}>
              <Text style={styles.goalIconText}>🎯</Text>
            </View>
            <View>
              <Text style={styles.goalTitle}>Today's Goal</Text>
              <Text style={styles.goalSubtitle}>15 mins of learning</Text>
            </View>
          </View>

          {/* Right Circular Goal Ring */}
          <View style={styles.goalRing}>
            <Text style={styles.goalRingText}>🔥 {streakDays}</Text>
            <Text style={styles.goalRingSub}>Days</Text>
          </View>
        </View>

        {/* Linear Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: '80%' }]} />
          </View>
          <Text style={styles.progressCountText}>12 / 15 mins</Text>
        </View>

        {/* Continue Learning CTA Button */}
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => onNavigate('PhaseLessons', { phase: user?.phase })}
        >
          <Text style={styles.continueBtnText}>Continue Learning</Text>
          <Text style={styles.continueBtnArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* 📅 THIS WEEK HABIT CALENDAR */}
      <View style={styles.weekCard}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeaderTitle}>This Week</Text>
          <Text style={styles.sectionHeaderRight}>4 / 7 Days</Text>
        </View>

        <View style={styles.daysRow}>
          {daysOfWeek.map((item, idx) => (
            <View key={idx} style={styles.dayCol}>
              <Text style={styles.dayLabel}>{item.day}</Text>
              <View
                style={[
                  styles.dayCircle,
                  item.done && styles.dayCircleDone,
                  item.isFlame && styles.dayCircleFlame,
                ]}
              >
                {item.isFlame ? (
                  <Text style={styles.flameText}>🔥</Text>
                ) : item.done ? (
                  <Text style={styles.checkText}>✓</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 🚀 QUICK START INTERACTIVE MODULES */}
      <View style={styles.quickSection}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeaderTitle}>Quick Start</Text>
          <TouchableOpacity onPress={() => onNavigate('PhaseLessons')}>
            <Text style={styles.sectionHeaderLink}>See All ›</Text>
          </TouchableOpacity>
        </View>

        {/* 1. Daily Roleplay */}
        <TouchableOpacity
          style={[styles.quickCardItem, { backgroundColor: '#1E1B4B' }]}
          onPress={() => onNavigate('DailyConversation')}
        >
          <View style={styles.quickCardLeft}>
            <View style={[styles.quickIconCircle, { backgroundColor: colors.primary }]}>
              <Text style={styles.quickIconEmoji}>🗣️</Text>
            </View>
            <View style={styles.quickTextGroup}>
              <Text style={styles.quickTitleText}>Daily Roleplay</Text>
              <Text style={styles.quickSubText}>Turn-by-turn conversation practice</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.startPillBtn, { backgroundColor: colors.primary }]}
            onPress={() => onNavigate('DailyConversation')}
          >
            <Text style={styles.startPillText}>Start</Text>
            <Text style={styles.startPillArrow}>›</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* 2. Read & Practice Stories */}
        <TouchableOpacity
          style={[styles.quickCardItem, { backgroundColor: '#31122B' }]}
          onPress={() => onNavigate('Stories')}
        >
          <View style={styles.quickCardLeft}>
            <View style={[styles.quickIconCircle, { backgroundColor: colors.pink }]}>
              <Text style={styles.quickIconEmoji}>📖</Text>
            </View>
            <View style={styles.quickTextGroup}>
              <Text style={styles.quickTitleText}>Read & Practice Stories</Text>
              <Text style={styles.quickSubText}>Improve vocabulary with interesting stories</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.startPillBtn, { backgroundColor: colors.pink }]}
            onPress={() => onNavigate('Stories')}
          >
            <Text style={styles.startPillText}>Start</Text>
            <Text style={styles.startPillArrow}>›</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* 3. 1-Minute Speech Sprint */}
        <TouchableOpacity
          style={[styles.quickCardItem, { backgroundColor: '#20163A' }]}
          onPress={() => onNavigate('OneMinuteSprint')}
        >
          <View style={styles.quickCardLeft}>
            <View style={[styles.quickIconCircle, { backgroundColor: '#8B5CF6' }]}>
              <Text style={styles.quickIconEmoji}>⏱️</Text>
            </View>
            <View style={styles.quickTextGroup}>
              <Text style={styles.quickTitleText}>1-Minute Speech Sprint</Text>
              <Text style={styles.quickSubText}>60-second speaking challenge & WPM fluency rate</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.startPillBtn, { backgroundColor: '#8B5CF6' }]}
            onPress={() => onNavigate('OneMinuteSprint')}
          >
            <Text style={styles.startPillText}>Start</Text>
            <Text style={styles.startPillArrow}>›</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* 4. Pronunciation Checker Lab */}
        <TouchableOpacity
          style={[styles.quickCardItem, { backgroundColor: '#062C28' }]}
          onPress={() => onNavigate('SpeakingLab')}
        >
          <View style={styles.quickCardLeft}>
            <View style={[styles.quickIconCircle, { backgroundColor: colors.teal }]}>
              <Text style={styles.quickIconEmoji}>🎙️</Text>
            </View>
            <View style={styles.quickTextGroup}>
              <Text style={styles.quickTitleText}>Pronunciation Checker Lab</Text>
              <Text style={styles.quickSubText}>Perfect your pronunciation with AI feedback</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.startPillBtn, { backgroundColor: colors.teal }]}
            onPress={() => onNavigate('SpeakingLab')}
          >
            <Text style={styles.startPillText}>Start</Text>
            <Text style={styles.startPillArrow}>›</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {/* 📊 WEEKLY PROGRESS ANALYTICS GRID */}
      <View style={styles.progressSection}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeaderTitle}>Weekly Progress</Text>
          <TouchableOpacity onPress={() => onNavigate('Profile')}>
            <Text style={styles.sectionHeaderLink}>View Details ›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.metricsGrid}>
          {/* Metric 1 */}
          <View style={styles.metricCardBox}>
            <View style={styles.metricHeaderRow}>
              <View style={[styles.miniIconBg, { backgroundColor: colors.primary }]}>
                <Text style={styles.miniIconEmoji}>📚</Text>
              </View>
              <Text style={styles.metricBigVal}>{completedLessons.length || 24}</Text>
            </View>
            <Text style={styles.metricLabel}>Lessons Completed</Text>
            <Text style={styles.metricTrend}>↑ 12 this week</Text>
          </View>

          {/* Metric 2 */}
          <View style={styles.metricCardBox}>
            <View style={styles.metricHeaderRow}>
              <View style={[styles.miniIconBg, { backgroundColor: '#0EA5E9' }]}>
                <Text style={styles.miniIconEmoji}>⏱️</Text>
              </View>
              <Text style={styles.metricBigVal}>3h 45m</Text>
            </View>
            <Text style={styles.metricLabel}>Speaking Time</Text>
            <Text style={styles.metricTrend}>↑ 45m this week</Text>
          </View>

          {/* Metric 3 */}
          <View style={styles.metricCardBox}>
            <View style={styles.metricHeaderRow}>
              <View style={[styles.miniIconBg, { backgroundColor: colors.pink }]}>
                <Text style={styles.miniIconEmoji}>📖</Text>
              </View>
              <Text style={styles.metricBigVal}>8</Text>
            </View>
            <Text style={styles.metricLabel}>Stories Read</Text>
            <Text style={styles.metricTrend}>↑ 3 this week</Text>
          </View>

          {/* Metric 4 */}
          <View style={styles.metricCardBox}>
            <View style={styles.metricHeaderRow}>
              <View style={[styles.miniIconBg, { backgroundColor: colors.accent }]}>
                <Text style={styles.miniIconEmoji}>🎯</Text>
              </View>
              <Text style={styles.metricBigVal}>87%</Text>
            </View>
            <Text style={styles.metricLabel}>Accuracy Rate</Text>
            <Text style={styles.metricTrend}>↑ 5% this week</Text>
          </View>
        </View>
      </View>

      {/* 🎓 CHOOSE LEARNING PHASE CARDS */}
      <Text style={styles.sectionHeaderTitle}>Select Curriculum Phase</Text>
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

  // Today's Goal Card
  goalCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: 16,
  },
  goalTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  goalTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  goalIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalIconText: {
    fontSize: 20,
  },
  goalTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  goalSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  goalRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0F172A',
    borderWidth: 2,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalRingText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  goalRingSub: {
    color: colors.textMuted,
    fontSize: 9,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  progressBarTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#0F172A',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressCountText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  continueBtn: {
    backgroundColor: colors.primaryDark,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  continueBtnText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 15,
  },
  continueBtnArrow: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
  },

  // This Week Activity Tracker
  weekCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionHeaderTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  sectionHeaderRight: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeaderLink: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCol: {
    alignItems: 'center',
    gap: 6,
  },
  dayLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  dayCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleDone: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  dayCircleFlame: {
    backgroundColor: '#0F172A',
    borderColor: colors.accent,
  },
  checkText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 13,
  },
  flameText: {
    fontSize: 14,
  },

  // Quick Start Section
  quickSection: {
    marginBottom: 18,
  },
  quickCardItem: {
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  quickCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    marginRight: 10,
  },
  quickIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickIconEmoji: {
    fontSize: 20,
  },
  quickTextGroup: {
    flex: 1,
  },
  quickTitleText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  quickSubText: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  startPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  startPillText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 13,
  },
  startPillArrow: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
  },

  // Weekly Progress Analytics Grid
  progressSection: {
    marginBottom: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metricCardBox: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  metricHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  miniIconBg: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniIconEmoji: {
    fontSize: 14,
  },
  metricBigVal: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  metricLabel: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  metricTrend: {
    color: colors.secondary,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },

  // Learning Phase Cards
  phaseCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  phaseIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  phaseIconText: {
    fontSize: 20,
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
    fontSize: 11,
    marginTop: 2,
  },
});
