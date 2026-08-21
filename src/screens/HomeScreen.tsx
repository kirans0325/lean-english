import React, { useState } from 'react';
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
import { todayDailyPlan } from '../data/dailyPlanData';
import { DailyPlanModal } from '../components/DailyPlanModal';

interface HomeScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { xpPoints, streakDays, completedLessons } = useProgress();
  const [showDailyPlanModal, setShowDailyPlanModal] = useState<boolean>(false);

  const plan = todayDailyPlan;

  const daysOfWeek = [
    { day: 'Mon', done: true },
    { day: 'Tue', done: true },
    { day: 'Wed', done: true },
    { day: 'Thu', done: true, isFlame: true },
    { day: 'Fri', done: false },
    { day: 'Sat', done: false },
    { day: 'Sun', done: false },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🌟 COACH SPOTLIGHT: TODAY'S ENGLISH PLAN */}
      <View style={styles.dailyPlanSpotlightCard}>
        <View style={styles.coachHeaderRow}>
          <View style={styles.coachBadgeGroup}>
            <Text style={styles.coachEmoji}>🎯</Text>
            <Text style={styles.coachTitleTag}>PERSONAL COACH GUIDED PLAN</Text>
          </View>
          <View style={styles.timeBadge}>
            <Text style={styles.timeBadgeText}>⏱️ {plan.estimatedTimeMins} mins</Text>
          </View>
        </View>

        <Text style={styles.todayFocusHeading}>Today's Focus: {plan.todayFocus}</Text>
        <Text style={styles.whyDoItText}>💡 Why do this: {plan.whyDoIt}</Text>

        <View style={styles.skillBox}>
          <Text style={styles.skillBoxText}>🚀 Skill Improving: {plan.skillImproved}</Text>
        </View>

        {/* 5-Step Guided Learning Pathway Preview */}
        <View style={styles.stepPathwayBox}>
          <Text style={styles.pathwayHeading}>5-Step Daily Learning Journey:</Text>
          <View style={styles.pathwayStepsRow}>
            <View style={styles.pathStep}>
              <Text style={styles.pathNum}>1</Text>
              <Text style={styles.pathLbl}>Warm-up</Text>
            </View>
            <Text style={styles.pathArrow}>›</Text>
            <View style={styles.pathStep}>
              <Text style={styles.pathNum}>2</Text>
              <Text style={styles.pathLbl}>Learn</Text>
            </View>
            <Text style={styles.pathArrow}>›</Text>
            <View style={styles.pathStep}>
              <Text style={styles.pathNum}>3</Text>
              <Text style={styles.pathLbl}>Practice</Text>
            </View>
            <Text style={styles.pathArrow}>›</Text>
            <View style={styles.pathStep}>
              <Text style={styles.pathNum}>4</Text>
              <Text style={styles.pathLbl}>Speak</Text>
            </View>
            <Text style={styles.pathArrow}>›</Text>
            <View style={styles.pathStep}>
              <Text style={styles.pathNum}>5</Text>
              <Text style={styles.pathLbl}>Feedback</Text>
            </View>
          </View>
        </View>

        {/* Primary CTA */}
        <TouchableOpacity
          style={styles.primaryPlanCta}
          onPress={() => setShowDailyPlanModal(true)}
        >
          <Text style={styles.primaryPlanCtaText}>Start Today's 10-Minute Practice</Text>
          <Text style={styles.primaryPlanCtaArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* 📅 THIS WEEK HABIT CALENDAR */}
      <View style={styles.weekCard}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeaderTitle}>This Week's Consistency</Text>
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

      {/* 🧰 COMPACT SECONDARY MODULES: PRACTICE MORE */}
      <View style={styles.practiceMoreSection}>
        <Text style={styles.sectionHeaderTitle}>Practice More</Text>
        <Text style={styles.sectionSubTitle}>Target specific English skills with specialized interactive tools.</Text>

        <View style={styles.compactGrid}>
          {/* Daily Roleplay */}
          <TouchableOpacity
            style={[styles.compactCard, { backgroundColor: '#1E1B4B' }]}
            onPress={() => onNavigate('DailyConversation')}
          >
            <View style={[styles.compactIconBg, { backgroundColor: colors.primary }]}>
              <Text style={styles.compactIconEmoji}>🗣️</Text>
            </View>
            <View style={styles.compactInfo}>
              <Text style={styles.compactTitle}>Daily Roleplay</Text>
              <Text style={styles.compactSub}>Turn-by-turn conversation practice</Text>
            </View>
            <View style={[styles.compactPill, { backgroundColor: colors.primary }]}>
              <Text style={styles.compactPillText}>Start ›</Text>
            </View>
          </TouchableOpacity>

          {/* Stories */}
          <TouchableOpacity
            style={[styles.compactCard, { backgroundColor: '#31122B' }]}
            onPress={() => onNavigate('Stories')}
          >
            <View style={[styles.compactIconBg, { backgroundColor: colors.pink }]}>
              <Text style={styles.compactIconEmoji}>📖</Text>
            </View>
            <View style={styles.compactInfo}>
              <Text style={styles.compactTitle}>Stories</Text>
              <Text style={styles.compactSub}>Read & practice with audio narrators</Text>
            </View>
            <View style={[styles.compactPill, { backgroundColor: colors.pink }]}>
              <Text style={styles.compactPillText}>Start ›</Text>
            </View>
          </TouchableOpacity>

          {/* Speech Sprint */}
          <TouchableOpacity
            style={[styles.compactCard, { backgroundColor: '#20163A' }]}
            onPress={() => onNavigate('OneMinuteSprint')}
          >
            <View style={[styles.compactIconBg, { backgroundColor: '#8B5CF6' }]}>
              <Text style={styles.compactIconEmoji}>⏱️</Text>
            </View>
            <View style={styles.compactInfo}>
              <Text style={styles.compactTitle}>Speech Sprint</Text>
              <Text style={styles.compactSub}>60-second speaking challenge & WPM</Text>
            </View>
            <View style={[styles.compactPill, { backgroundColor: '#8B5CF6' }]}>
              <Text style={styles.compactPillText}>Start ›</Text>
            </View>
          </TouchableOpacity>

          {/* Pronunciation Lab */}
          <TouchableOpacity
            style={[styles.compactCard, { backgroundColor: '#062C28' }]}
            onPress={() => onNavigate('SpeakingLab')}
          >
            <View style={[styles.compactIconBg, { backgroundColor: colors.teal }]}>
              <Text style={styles.compactIconEmoji}>🎙️</Text>
            </View>
            <View style={styles.compactInfo}>
              <Text style={styles.compactTitle}>Pronunciation Lab</Text>
              <Text style={styles.compactSub}>Real-time AI voice accuracy scoring</Text>
            </View>
            <View style={[styles.compactPill, { backgroundColor: colors.teal }]}>
              <Text style={styles.compactPillText}>Start ›</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* 📊 WEEKLY PROGRESS METRICS SUMMARY */}
      <View style={styles.progressSection}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeaderTitle}>Weekly Progress Summary</Text>
          <TouchableOpacity onPress={() => onNavigate('Profile')}>
            <Text style={styles.sectionHeaderLink}>View Details ›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.metricsGrid}>
          <View style={styles.metricCardBox}>
            <Text style={styles.metricBigVal}>{completedLessons.length || 24}</Text>
            <Text style={styles.metricLabel}>Lessons Completed</Text>
          </View>
          <View style={styles.metricCardBox}>
            <Text style={styles.metricBigVal}>3h 45m</Text>
            <Text style={styles.metricLabel}>Speaking Time</Text>
          </View>
          <View style={styles.metricCardBox}>
            <Text style={styles.metricBigVal}>8</Text>
            <Text style={styles.metricLabel}>Stories Read</Text>
          </View>
          <View style={styles.metricCardBox}>
            <Text style={styles.metricBigVal}>87%</Text>
            <Text style={styles.metricLabel}>Accuracy Rate</Text>
          </View>
        </View>
      </View>

      {/* Daily Plan Interactive Modal */}
      <DailyPlanModal
        visible={showDailyPlanModal}
        onClose={() => setShowDailyPlanModal(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },

  // Daily Plan Spotlight Card
  dailyPlanSpotlightCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1.5,
    borderColor: colors.primary,
    marginBottom: 18,
  },
  coachHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  coachBadgeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  coachEmoji: {
    fontSize: 16,
  },
  coachTitleTag: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  timeBadge: {
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeBadgeText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '800',
  },
  todayFocusHeading: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
  },
  whyDoItText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  skillBox: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
  },
  skillBoxText: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '800',
  },
  stepPathwayBox: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
  },
  pathwayHeading: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  pathwayStepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pathStep: {
    alignItems: 'center',
  },
  pathNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primaryDark,
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 11,
    fontWeight: '800',
  },
  pathLbl: {
    color: colors.textSecondary,
    fontSize: 9,
    marginTop: 2,
  },
  pathArrow: {
    color: colors.textMuted,
    fontSize: 14,
  },
  primaryPlanCta: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primaryPlanCtaText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 16,
  },
  primaryPlanCtaArrow: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
  },

  // Week Habit Card
  weekCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: 18,
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
    width: 32,
    height: 32,
    borderRadius: 16,
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
    fontSize: 12,
  },
  flameText: {
    fontSize: 13,
  },

  // Practice More Section
  practiceMoreSection: {
    marginBottom: 18,
  },
  sectionSubTitle: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: -8,
    marginBottom: 12,
  },
  compactGrid: {
    gap: 10,
  },
  compactCard: {
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  compactIconBg: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  compactIconEmoji: {
    fontSize: 18,
  },
  compactInfo: {
    flex: 1,
  },
  compactTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  compactSub: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  compactPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  compactPillText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 11,
  },

  // Progress Section
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
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  metricBigVal: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '900',
  },
  metricLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
});
