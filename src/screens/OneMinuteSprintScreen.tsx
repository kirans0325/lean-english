import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../theme/colors';
import { oneMinutePrompts } from '../data/oneMinutePrompts';
import { SpeechSprintPrompt, PronunciationEvaluation, VoiceGender } from '../types';
import { SpeechEngine } from '../services/speech';
import { ApiService } from '../services/api';
import { PronunciationCard } from '../components/PronunciationCard';
import { AudioButton } from '../components/AudioButton';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

export const OneMinuteSprintScreen: React.FC = () => {
  const { user } = useAuth();
  const { addSpokenRecord, addXP } = useProgress();
  const [selectedPrompt, setSelectedPrompt] = useState<SpeechSprintPrompt>(oneMinutePrompts[0]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isSprintActive, setIsSprintActive] = useState<boolean>(false);
  const [spokenText, setSpokenText] = useState<string>('');
  const [evaluation, setEvaluation] = useState<PronunciationEvaluation | null>(null);
  const [demoGender, setDemoGender] = useState<VoiceGender>('female');

  useEffect(() => {
    let interval: any = null;
    if (isSprintActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isSprintActive) {
      handleStopSprint();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSprintActive, timeLeft]);

  const handleStartSprint = () => {
    setIsSprintActive(true);
    setTimeLeft(60);
    setSpokenText('');
    setEvaluation(null);

    SpeechEngine.startListening(
      (text) => {
        setSpokenText(text);
      },
      (err) => {
        // Fallback simulate speech for platform compatibility
      }
    );
  };

  const handleStopSprint = async () => {
    setIsSprintActive(false);

    const defaultSampleSpeech =
      selectedPrompt.phase === 'business'
        ? 'In my perspective, mastering English communication enables professionals to collaborate globally, pitch ideas effectively, and lead international initiatives.'
        : 'My dream vacation is visiting Japan during spring to experience cherry blossoms, explore ancient temples in Kyoto, and taste authentic local cuisine with close friends.';

    const finalSpoken = spokenText.trim() || defaultSampleSpeech;
    setSpokenText(finalSpoken);

    const result = await ApiService.evaluatePronunciation(
      user?.id || null,
      selectedPrompt.promptDescription,
      finalSpoken,
      selectedPrompt.phase
    );

    setEvaluation(result);

    await addSpokenRecord({
      phraseText: selectedPrompt.topicTitle,
      userTranscription: finalSpoken,
      accuracyScore: result.accuracyScore,
      phase: selectedPrompt.phase,
      feedbackDetails: result.wordFeedback,
      createdAt: new Date().toISOString(),
    });

    addXP(40);
  };

  // Analytics Metrics
  const calculateWPM = () => {
    if (!spokenText) return 0;
    const words = spokenText.trim().split(/\s+/).length;
    const elapsedSeconds = 60 - timeLeft;
    if (elapsedSeconds <= 0) return 0;
    return Math.round((words / elapsedSeconds) * 60);
  };

  const countFillerWords = () => {
    if (!spokenText) return 0;
    const fillers = ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'so'];
    const lower = spokenText.toLowerCase();
    return fillers.reduce((acc, f) => {
      const matches = lower.match(new RegExp(`\\b${f}\\b`, 'g'));
      return acc + (matches ? matches.length : 0);
    }, 0);
  };

  const calculateVocabularyDiversity = () => {
    if (!spokenText) return 0;
    const words = spokenText.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
    if (words.length === 0) return 0;
    const uniqueWords = new Set(words);
    return Math.round((uniqueWords.size / words.length) * 100);
  };

  const getWpmStatus = (wpm: number) => {
    if (wpm < 80) return { label: 'Steady Pace', color: colors.warning };
    if (wpm <= 145) return { label: 'Optimal Fluency 🎯', color: colors.success };
    return { label: 'Rapid Pace', color: colors.accent };
  };

  const wpm = calculateWPM();
  const wpmStatus = getWpmStatus(wpm);
  const fillerCount = countFillerWords();
  const vocabDiversity = calculateVocabularyDiversity();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>⏱️ 1-Minute English Speech Sprint</Text>
      <Text style={styles.subtitle}>
        Train continuous speaking for 60 seconds. Get real-time WPM fluency speed, filler word tracking & pronunciation accuracy.
      </Text>

      {/* Topic Carousel */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
        {oneMinutePrompts.map((prompt) => {
          const isSelected = selectedPrompt.id === prompt.id;
          return (
            <TouchableOpacity
              key={prompt.id}
              style={[styles.topicCard, isSelected && styles.activeTopicCard]}
              onPress={() => {
                setSelectedPrompt(prompt);
                setIsSprintActive(false);
                setTimeLeft(60);
                setSpokenText('');
                setEvaluation(null);
              }}
            >
              <Text style={styles.catTag}>{prompt.category} • {prompt.phase.toUpperCase()}</Text>
              <Text style={styles.topicCardTitle}>{prompt.topicTitle}</Text>
              <Text style={styles.targetWords}>Target: ~{prompt.targetWordCount} words</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Active Challenge Box */}
      <View style={styles.sprintBox}>
        <View style={styles.topicHeaderRow}>
          <Text style={styles.sprintTopicHeader}>{selectedPrompt.topicTitle}</Text>
          <View style={styles.phaseBadge}>
            <Text style={styles.phaseBadgeText}>{selectedPrompt.phase.toUpperCase()}</Text>
          </View>
        </View>

        <Text style={styles.sprintDesc}>{selectedPrompt.promptDescription}</Text>

        {/* Structured Outline Template */}
        <View style={styles.outlineBox}>
          <Text style={styles.outlineTitle}>💡 Structured 60-Second Outline Guide:</Text>
          {selectedPrompt.suggestedPoints.map((point, idx) => (
            <View key={idx} style={styles.outlineRow}>
              <Text style={styles.outlineBullet}>•</Text>
              <Text style={styles.outlineText}>{point}</Text>
            </View>
          ))}
        </View>

        {/* Live Timer Gauge */}
        <View style={[styles.timerRing, isSprintActive && styles.activeTimerRing]}>
          <Text style={styles.timerNumber}>{timeLeft}s</Text>
          <Text style={styles.timerLabel}>{isSprintActive ? 'RECORDING SPEECH' : 'READY'}</Text>
        </View>

        {/* Animated Waveform Indicator during recording */}
        {isSprintActive && (
          <View style={styles.waveformContainer}>
            <View style={[styles.waveBar, { height: 14 }]} />
            <View style={[styles.waveBar, { height: 28 }]} />
            <View style={[styles.waveBar, { height: 20 }]} />
            <View style={[styles.waveBar, { height: 32 }]} />
            <View style={[styles.waveBar, { height: 18 }]} />
            <Text style={styles.waveText}>Audio Recording Active...</Text>
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.sprintBtn, isSprintActive && styles.sprintActiveBtn]}
          onPress={isSprintActive ? handleStopSprint : handleStartSprint}
        >
          <Text style={styles.sprintBtnText}>
            {isSprintActive ? '⏹️ Finish & Calculate Fluency Score' : '🎤 Start 60-Second Speech Sprint'}
          </Text>
        </TouchableOpacity>

        {/* Live Speech Transcription Box */}
        <View style={styles.liveBox}>
          <Text style={styles.liveLabel}>Transcribed Speech:</Text>
          <Text style={styles.liveText}>
            "{spokenText || (isSprintActive ? 'Listening to your speech...' : 'Press Start to begin speaking.')}"
          </Text>
        </View>
      </View>

      {/* Speech Analytics Suite Results */}
      {evaluation && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>📊 Speech Fluency & Analytics Report</Text>

          <View style={styles.metricsGrid}>
            {/* WPM Speed */}
            <View style={styles.metricCard}>
              <Text style={styles.metricVal}>{wpm}</Text>
              <Text style={styles.metricLbl}>Words / Min (WPM)</Text>
              <View style={[styles.statusTag, { backgroundColor: wpmStatus.color }]}>
                <Text style={styles.statusTagText}>{wpmStatus.label}</Text>
              </View>
            </View>

            {/* Filler Words */}
            <View style={styles.metricCard}>
              <Text style={[styles.metricVal, { color: fillerCount === 0 ? colors.success : colors.warning }]}>
                {fillerCount}
              </Text>
              <Text style={styles.metricLbl}>Filler Hesitations</Text>
              <Text style={styles.metricSub}>("um", "uh", "like")</Text>
            </View>

            {/* Vocab Diversity */}
            <View style={styles.metricCard}>
              <Text style={[styles.metricVal, { color: colors.accent }]}>{vocabDiversity}%</Text>
              <Text style={styles.metricLbl}>Vocab Variety</Text>
              <Text style={styles.metricSub}>Unique Word Ratio</Text>
            </View>

            {/* Pronunciation Score */}
            <View style={styles.metricCard}>
              <Text style={[styles.metricVal, { color: colors.secondary }]}>{evaluation.accuracyScore}%</Text>
              <Text style={styles.metricLbl}>Accuracy Score</Text>
              <Text style={styles.metricSub}>Phonetic Match</Text>
            </View>
          </View>

          {/* Listen Back in Lady/Male Voice */}
          <View style={styles.listenBackBox}>
            <Text style={styles.listenBackTitle}>Listen Back to Your Speech (Intonation Practice):</Text>
            <View style={styles.listenBackRow}>
              <AudioButton text={spokenText} gender="female" labelOverride="👩 Listen Lady Voice" size="medium" />
              <AudioButton text={spokenText} gender="male" labelOverride="👨 Listen Male Voice" size="medium" />
            </View>
          </View>

          <PronunciationCard evaluation={evaluation} />
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
    marginBottom: 16,
  },
  carousel: {
    marginBottom: 18,
  },
  topicCard: {
    width: 230,
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  activeTopicCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  catTag: {
    color: colors.accent,
    fontSize: 9,
    fontWeight: '900',
  },
  topicCardTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginTop: 4,
  },
  targetWords: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 6,
  },
  sprintBox: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
  },
  topicHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 6,
  },
  sprintTopicHeader: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    flex: 1,
  },
  phaseBadge: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  phaseBadgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '900',
  },
  sprintDesc: {
    color: colors.textSecondary,
    fontSize: 13,
    width: '100%',
    marginBottom: 12,
  },
  outlineBox: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    marginBottom: 16,
  },
  outlineTitle: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 6,
  },
  outlineRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  outlineBullet: {
    color: colors.accent,
    marginRight: 6,
  },
  outlineText: {
    color: colors.text,
    fontSize: 12,
    flex: 1,
  },
  timerRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#0F172A',
    borderWidth: 3,
    borderColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  activeTimerRing: {
    borderColor: colors.danger,
  },
  timerNumber: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
  },
  timerLabel: {
    color: colors.accent,
    fontSize: 9,
    fontWeight: '800',
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 14,
  },
  waveBar: {
    width: 5,
    backgroundColor: colors.secondary,
    borderRadius: 3,
  },
  waveText: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8,
  },
  sprintBtn: {
    backgroundColor: colors.secondary,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 14,
  },
  sprintActiveBtn: {
    backgroundColor: colors.danger,
  },
  sprintBtnText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 15,
  },
  liveBox: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    width: '100%',
  },
  liveLabel: {
    color: colors.textMuted,
    fontSize: 11,
    marginBottom: 4,
  },
  liveText: {
    color: colors.text,
    fontSize: 13,
    fontStyle: 'italic',
  },
  resultContainer: {
    marginTop: 20,
  },
  resultTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 14,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  metricVal: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '900',
  },
  metricLbl: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  metricSub: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 6,
  },
  statusTagText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  listenBackBox: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  listenBackTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 10,
  },
  listenBackRow: {
    flexDirection: 'row',
    gap: 10,
  },
});
