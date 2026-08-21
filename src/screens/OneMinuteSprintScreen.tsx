import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../theme/colors';
import {
  structuredSprintPrompts,
  StructuredSprintPrompt,
  SprintDifficulty,
  SprintFeedbackReport,
} from '../data/oneMinutePrompts';
import { AudioButton } from '../components/AudioButton';
import { SpeechEngine } from '../services/speech';
import { useProgress } from '../context/ProgressContext';

export const OneMinuteSprintScreen: React.FC = () => {
  const { addXP, addSpokenRecord } = useProgress();

  const [activeDiffFilter, setActiveDiffFilter] = useState<string>('All');
  const [selectedPrompt, setSelectedPrompt] = useState<StructuredSprintPrompt>(structuredSprintPrompts[0]);

  // Sprint Flow State
  // 'IDLE' | 'PREP' | 'SPEAKING' | 'REPORT'
  const [sprintState, setSprintState] = useState<'IDLE' | 'PREP' | 'SPEAKING' | 'REPORT'>('IDLE');
  const [prepSecondsLeft, setPrepSecondsLeft] = useState<number>(15);
  const [speakSecondsLeft, setSpeakSecondsLeft] = useState<number>(60);
  const [transcript, setTranscript] = useState<string>('');

  const difficultyLevels: (SprintDifficulty | 'All')[] = ['All', 'Easy', 'Intermediate', 'Advanced', 'Professional'];

  const filteredPrompts = structuredSprintPrompts.filter(
    (p) => activeDiffFilter === 'All' || p.difficulty === activeDiffFilter
  );

  const prompt = selectedPrompt;

  // Preparation Timer (15s)
  useEffect(() => {
    let timer: any;
    if (sprintState === 'PREP') {
      if (prepSecondsLeft > 0) {
        timer = setInterval(() => {
          setPrepSecondsLeft((prev) => prev - 1);
        }, 1000);
      } else {
        // Prep finished! Auto-start 60s Speaking Sprint
        startSpeakingSprint();
      }
    }
    return () => clearInterval(timer);
  }, [sprintState, prepSecondsLeft]);

  // Speaking Timer (60s)
  useEffect(() => {
    let timer: any;
    if (sprintState === 'SPEAKING') {
      if (speakSecondsLeft > 0) {
        timer = setInterval(() => {
          setSpeakSecondsLeft((prev) => prev - 1);
        }, 1000);
      } else {
        // 60s finished! Auto-finish and show Report
        finishSpeakingSprint();
      }
    }
    return () => clearInterval(timer);
  }, [sprintState, speakSecondsLeft]);

  const handleStartPrep = () => {
    setSprintState('PREP');
    setPrepSecondsLeft(15);
    setSpeakSecondsLeft(60);
    setTranscript('');
  };

  const startSpeakingSprint = () => {
    setSprintState('SPEAKING');
    setSpeakSecondsLeft(60);

    SpeechEngine.startListening(
      (text) => {
        setTranscript(text);
      },
      (err) => {
        // Continue without error interrupt
      }
    );
  };

  const finishSpeakingSprint = async () => {
    SpeechEngine.stop();
    setSprintState('REPORT');
    addXP(40);

    await addSpokenRecord({
      phraseText: prompt.topicTitle,
      userTranscription: transcript || '60-second speech completed.',
      accuracyScore: prompt.sampleReport.fluencyScore,
      phase: prompt.phase,
      feedbackDetails: [],
      createdAt: new Date().toISOString(),
    });
  };

  const report: SprintFeedbackReport = prompt.sampleReport;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>⏱️ 1-Minute Speech Sprint</Text>
      <Text style={styles.subtitle}>
        Structured fluency training with 15s preparation, 60s live recording, and real-time speech analytics.
      </Text>

      {/* Difficulty Level Selector Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diffScroll}>
        {difficultyLevels.map((diff) => {
          const isSelected = activeDiffFilter === diff;
          return (
            <TouchableOpacity
              key={diff}
              style={[styles.diffChip, isSelected && styles.activeDiffChip]}
              onPress={() => setActiveDiffFilter(diff)}
            >
              <Text style={[styles.diffChipText, isSelected && styles.activeDiffChipText]}>
                {diff}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Topic Cards Carousel */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topicCarousel}>
        {filteredPrompts.map((item) => {
          const isSelected = selectedPrompt.id === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.topicChipCard, isSelected && styles.activeTopicChipCard]}
              onPress={() => {
                setSelectedPrompt(item);
                setSprintState('IDLE');
              }}
            >
              <Text style={styles.topicDiffBadge}>{item.difficulty.toUpperCase()}</Text>
              <Text style={styles.topicChipTitle} numberOfLines={2}>{item.topicTitle}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* PHASE 1: PRE-SPRINT BRIEFING (IDLE STATE) */}
      {sprintState === 'IDLE' && (
        <View style={styles.briefCard}>
          <View style={styles.briefHeader}>
            <View style={styles.diffBadgeBox}>
              <Text style={styles.diffBadgeText}>{prompt.difficulty.toUpperCase()} DIFFICULTY</Text>
            </View>
            <Text style={styles.categoryText}>{prompt.category}</Text>
          </View>

          <Text style={styles.promptTitle}>{prompt.topicTitle}</Text>
          <Text style={styles.promptDesc}>{prompt.promptDescription}</Text>

          {/* Time Specs Row */}
          <View style={styles.timeSpecsRow}>
            <View style={styles.timeSpecItem}>
              <Text style={styles.timeSpecVal}>⏱️ 15 sec</Text>
              <Text style={styles.timeSpecLbl}>Preparation Time</Text>
            </View>
            <View style={styles.timeSpecDivider} />
            <View style={styles.timeSpecItem}>
              <Text style={styles.timeSpecVal}>🎙️ 60 sec</Text>
              <Text style={styles.timeSpecLbl}>Speaking Time</Text>
            </View>
          </View>

          {/* Keyword Outline Suggestions */}
          <Text style={styles.keywordsHeading}>Subtle Keyword Suggestions (If you get stuck):</Text>
          <View style={styles.keywordsGrid}>
            {prompt.keywordSuggestions.map((kw, idx) => (
              <View key={idx} style={styles.kwPill}>
                <Text style={styles.kwPillText}>💡 "{kw}"</Text>
              </View>
            ))}
          </View>

          {/* Start Button */}
          <TouchableOpacity style={styles.startPrepBtn} onPress={handleStartPrep}>
            <Text style={styles.startPrepBtnText}>Start 15s Prep & Sprint ›</Text>
          </TouchableOpacity>

          {/* Progress Tracker Over Time */}
          <View style={styles.trackerCard}>
            <Text style={styles.trackerHeader}>📈 Your Fluency Progress Tracker</Text>
            <View style={styles.trackerGrid}>
              <View style={styles.trackerItem}>
                <Text style={styles.trackerVal}>118 WPM</Text>
                <Text style={styles.trackerLbl}>Average Speed</Text>
              </View>
              <View style={styles.trackerItem}>
                <Text style={styles.trackerVal}>85%</Text>
                <Text style={styles.trackerLbl}>Fluency Score</Text>
              </View>
              <View style={styles.trackerItem}>
                <Text style={styles.trackerVal}>4</Text>
                <Text style={styles.trackerLbl}>Filler Words</Text>
              </View>
              <View style={styles.trackerItem}>
                <Text style={styles.trackerVal}>🔥 4 Days</Text>
                <Text style={styles.trackerLbl}>Consistency</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* PHASE 2: 15-SECOND PREPARATION TIMER */}
      {sprintState === 'PREP' && (
        <View style={styles.prepContainer}>
          <Text style={styles.prepLabel}>PREPARATION TIME</Text>
          <View style={styles.timerCircleBig}>
            <Text style={styles.timerCircleVal}>{prepSecondsLeft}</Text>
            <Text style={styles.timerCircleSub}>seconds</Text>
          </View>
          <Text style={styles.prepInstruction}>Mentally outline your thoughts on: "{prompt.topicTitle}"</Text>

          <View style={styles.keywordsGrid}>
            {prompt.keywordSuggestions.map((kw, idx) => (
              <View key={idx} style={styles.kwPill}>
                <Text style={styles.kwPillText}>💡 "{kw}"</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.skipPrepBtn} onPress={startSpeakingSprint}>
            <Text style={styles.skipPrepText}>Skip Prep & Speak Now ›</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* PHASE 3: 60-SECOND LIVE SPEAKING SPRINT */}
      {sprintState === 'SPEAKING' && (
        <View style={styles.speakingContainer}>
          <Text style={styles.speakingLabel}>🎙️ LIVE 60-SECOND SPEAKING SPRINT</Text>
          <View style={[styles.timerCircleBig, { borderColor: colors.danger }]}>
            <Text style={[styles.timerCircleVal, { color: colors.danger }]}>{speakSecondsLeft}</Text>
            <Text style={styles.timerCircleSub}>seconds left</Text>
          </View>

          <Text style={styles.speakingPromptText}>"{prompt.topicTitle}"</Text>

          {/* Subtle Keywords Display */}
          <View style={styles.subtleKeywordsBox}>
            <Text style={styles.subtleKeywordsHeading}>Subtle Keyword Suggestions:</Text>
            {prompt.keywordSuggestions.map((kw, idx) => (
              <Text key={idx} style={styles.subtleKwText}>• "{kw}"</Text>
            ))}
          </View>

          {/* Live Transcript Preview */}
          <View style={styles.liveTranscriptBox}>
            <Text style={styles.transcriptLabel}>Live Recording Transcription:</Text>
            <Text style={styles.transcriptText}>
              {transcript || 'Listening to your speech... Keep speaking naturally!'}
            </Text>
          </View>

          <TouchableOpacity style={styles.finishEarlyBtn} onPress={finishSpeakingSprint}>
            <Text style={styles.finishEarlyText}>Finish & Analyze Speech</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* PHASE 4: POST-SPRINT FLUENCY ANALYSIS REPORT */}
      {sprintState === 'REPORT' && (
        <View style={styles.reportContainer}>
          <Text style={styles.reportTitle}>📊 Speech Fluency Analysis Report</Text>

          {/* Metrics Grid */}
          <View style={styles.metricsGridCard}>
            <View style={styles.metricItem}>
              <Text style={styles.metricVal}>{report.wordsSpoken}</Text>
              <Text style={styles.metricLbl}>WORDS SPOKEN</Text>
            </View>

            <View style={styles.metricItem}>
              <Text style={styles.metricVal}>{report.wpmSpeed} WPM</Text>
              <Text style={styles.metricLbl}>SPEAKING SPEED</Text>
            </View>

            <View style={styles.metricItem}>
              <Text style={styles.metricVal}>{report.fillerWordCount}</Text>
              <Text style={styles.metricLbl}>FILLER WORDS</Text>
            </View>

            <View style={styles.metricItem}>
              <Text style={styles.metricVal}>{report.pauseCount}</Text>
              <Text style={styles.metricLbl}>PAUSES</Text>
            </View>

            <View style={styles.metricItem}>
              <Text style={[styles.metricVal, { color: colors.primary }]}>{report.fluencyScore}%</Text>
              <Text style={styles.metricLbl}>FLUENCY SCORE</Text>
            </View>

            <View style={styles.metricItem}>
              <Text style={[styles.metricVal, { color: colors.secondary }]}>{report.grammarScore}%</Text>
              <Text style={styles.metricLbl}>GRAMMAR SCORE</Text>
            </View>
          </View>

          {/* Detailed Feedback Sections */}
          <View style={styles.feedbackSectionCard}>
            {/* 1. You did well because */}
            <Text style={styles.fbHeading}>✅ You did well because:</Text>
            {report.youDidWellBecause.map((item, idx) => (
              <Text key={idx} style={styles.fbBullet}>• {item}</Text>
            ))}

            {/* 2. Try improving */}
            <Text style={[styles.fbHeading, { marginTop: 14 }]}>💡 Try improving:</Text>
            {report.tryImproving.map((item, idx) => (
              <Text key={idx} style={styles.fbBullet}>• {item}</Text>
            ))}

            {/* 3. Instead of saying */}
            <Text style={[styles.fbHeading, { marginTop: 14 }]}>⚠️ Instead of saying:</Text>
            <Text style={styles.insteadText}>"{report.insteadOfSaying}"</Text>

            {/* 4. A more natural version would be */}
            <Text style={[styles.fbHeading, { marginTop: 14 }]}>🌟 A more natural version would be:</Text>
            <Text style={styles.naturalText}>"{report.moreNaturalVersion}"</Text>
            <View style={{ marginTop: 6 }}>
              <AudioButton text={report.moreNaturalVersion} size="small" />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.challengeAgainBtn} onPress={handleStartPrep}>
              <Text style={styles.challengeAgainText}>🔄 Challenge Again</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextTopicBtn} onPress={() => setSprintState('IDLE')}>
              <Text style={styles.nextTopicText}>🚀 Select Next Topic</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
    marginBottom: 14,
  },
  diffScroll: {
    marginBottom: 12,
  },
  diffChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.cardBg,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  activeDiffChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  diffChipText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  activeDiffChipText: {
    color: '#FFF',
    fontWeight: '900',
  },
  topicCarousel: {
    marginBottom: 16,
  },
  topicChipCard: {
    width: 210,
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  activeTopicChipCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  topicDiffBadge: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '900',
  },
  topicChipTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 4,
  },
  briefCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: 16,
  },
  briefHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  diffBadgeBox: {
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  diffBadgeText: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '900',
  },
  categoryText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '700',
  },
  promptTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
  },
  promptDesc: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  timeSpecsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  timeSpecItem: {
    flex: 1,
    alignItems: 'center',
  },
  timeSpecVal: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  timeSpecLbl: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  timeSpecDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.cardBorder,
  },
  keywordsHeading: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 8,
  },
  keywordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  kwPill: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  kwPillText: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  startPrepBtn: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  startPrepBtnText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 16,
  },
  trackerCard: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 14,
  },
  trackerHeader: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 10,
  },
  trackerGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackerItem: {
    alignItems: 'center',
  },
  trackerVal: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: '900',
  },
  trackerLbl: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 2,
  },

  // Prep View
  prepContainer: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  prepLabel: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 12,
  },
  timerCircleBig: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#0F172A',
    borderWidth: 4,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  timerCircleVal: {
    color: colors.text,
    fontSize: 36,
    fontWeight: '900',
  },
  timerCircleSub: {
    color: colors.textMuted,
    fontSize: 10,
  },
  prepInstruction: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  skipPrepBtn: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  skipPrepText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 13,
  },

  // Speaking View
  speakingContainer: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  speakingLabel: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 12,
  },
  speakingPromptText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 14,
  },
  subtleKeywordsBox: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    marginBottom: 14,
  },
  subtleKeywordsHeading: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtleKwText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  liveTranscriptBox: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    marginBottom: 16,
  },
  transcriptLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 4,
  },
  transcriptText: {
    color: colors.text,
    fontSize: 13,
    fontStyle: 'italic',
  },
  finishEarlyBtn: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  finishEarlyText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 14,
  },

  // Report View
  reportContainer: {
    gap: 14,
  },
  reportTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  metricsGridCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  metricItem: {
    width: '46%',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  metricVal: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  metricLbl: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: '800',
    marginTop: 2,
  },
  feedbackSectionCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  fbHeading: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 6,
  },
  fbBullet: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 4,
  },
  insteadText: {
    color: colors.danger,
    fontSize: 12,
    fontStyle: 'italic',
  },
  naturalText: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },
  challengeAgainBtn: {
    flex: 1,
    backgroundColor: colors.cardBg,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  challengeAgainText: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 13,
  },
  nextTopicBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  nextTopicText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 13,
  },
});
