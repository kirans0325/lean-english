import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { colors } from '../theme/colors';
import {
  detailedPronunciationDrills,
  DetailedPronunciationDrill,
  PronunciationMode,
  initialWeakWordsList,
} from '../data/pronunciationDrills';
import { AudioButton } from '../components/AudioButton';
import { SpeechEngine, VoiceAccent } from '../services/speech';
import { ApiService } from '../services/api';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { PronunciationEvaluation } from '../types';

export const SpeakingLabScreen: React.FC = () => {
  const { user } = useAuth();
  const { addSpokenRecord } = useProgress();

  const [activeMode, setActiveMode] = useState<PronunciationMode>('Word');
  const [selectedDrill, setSelectedDrill] = useState<DetailedPronunciationDrill>(detailedPronunciationDrills[0]);
  const [activeAccent, setActiveAccent] = useState<VoiceAccent>('en-IN');
  const [customText, setCustomText] = useState<string>('');
  const [useCustomText, setUseCustomText] = useState<boolean>(false);

  // Recording State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [userSpeech, setUserSpeech] = useState<string>('');
  const [evaluationResult, setEvaluationResult] = useState<PronunciationEvaluation | null>(null);

  // Weak Words State
  const [weakWords, setWeakWords] = useState(initialWeakWordsList);

  const filteredDrills = detailedPronunciationDrills.filter(
    (d) => d.mode === activeMode
  );

  const targetText = useCustomText && customText.trim() ? customText : selectedDrill.phrase;

  const handleAccentChange = (accent: VoiceAccent) => {
    setActiveAccent(accent);
    SpeechEngine.setAccent(accent);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setUserSpeech('');
    setEvaluationResult(null);

    SpeechEngine.startListening(
      (text) => {
        setUserSpeech(text);
      },
      (err) => {
        setIsRecording(false);
        evaluateSpeech(targetText, targetText);
      }
    );
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    evaluateSpeech(targetText, userSpeech || targetText);
  };

  const evaluateSpeech = async (target: string, spoken: string) => {
    const result = await ApiService.evaluatePronunciation(
      user?.id || 1,
      target,
      spoken,
      selectedDrill.phase
    );
    setEvaluationResult(result);

    // Collect weak words if score is below 85%
    if (result.wordFeedback) {
      result.wordFeedback.forEach((wf) => {
        if (wf.status === 'yellow' || wf.status === 'red') {
          setWeakWords((prev) => {
            if (prev.some((item) => item.word.toLowerCase() === wf.word.toLowerCase())) return prev;
            return [
              ...prev,
              {
                word: wf.word,
                ipa: `/${wf.word.toLowerCase()}/`,
                tip: `Practice breaking "${wf.word}" into clear syllables. You are getting closer!`
              }
            ];
          });
        }
      });
    }

    await addSpokenRecord({
      phraseText: target,
      userTranscription: spoken,
      accuracyScore: result.accuracyScore,
      phase: selectedDrill.phase,
      feedbackDetails: result.wordFeedback,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎙️ Pronunciation Training System</Text>
      <Text style={styles.subtitle}>
        Master word stress, sentence intonation, and native shadowing with supportive AI feedback.
      </Text>

      {/* Accent Selector Box */}
      <View style={styles.accentBox}>
        <Text style={styles.accentLabel}>Preferred Voice Accent:</Text>
        <View style={styles.accentRow}>
          <TouchableOpacity
            style={[styles.accentBtn, activeAccent === 'en-IN' && styles.activeAccentBtn]}
            onPress={() => handleAccentChange('en-IN')}
          >
            <Text style={styles.accentBtnText}>🇮🇳 Indian English (Warm)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.accentBtn, activeAccent === 'en-US' && styles.activeAccentBtn]}
            onPress={() => handleAccentChange('en-US')}
          >
            <Text style={styles.accentBtnText}>🇺🇸 US English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.accentBtn, activeAccent === 'en-GB' && styles.activeAccentBtn]}
            onPress={() => handleAccentChange('en-GB')}
          >
            <Text style={styles.accentBtnText}>🇬🇧 UK English</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 3 PRACTICE MODES TABS */}
      <Text style={styles.sectionHeaderTitle}>Select Practice Mode</Text>
      <View style={styles.modeTabsRow}>
        <TouchableOpacity
          style={[styles.modeTabBtn, activeMode === 'Word' && styles.activeModeTabBtn]}
          onPress={() => {
            setActiveMode('Word');
            const drill = detailedPronunciationDrills.find((d) => d.mode === 'Word') || detailedPronunciationDrills[0];
            setSelectedDrill(drill);
            setEvaluationResult(null);
          }}
        >
          <Text style={styles.modeTabEmoji}>🔤</Text>
          <Text style={[styles.modeTabText, activeMode === 'Word' && styles.activeModeTabText]}>
            1. WORD PRACTICE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeTabBtn, activeMode === 'Sentence' && styles.activeModeTabBtn]}
          onPress={() => {
            setActiveMode('Sentence');
            const drill = detailedPronunciationDrills.find((d) => d.mode === 'Sentence') || detailedPronunciationDrills[0];
            setSelectedDrill(drill);
            setEvaluationResult(null);
          }}
        >
          <Text style={styles.modeTabEmoji}>💬</Text>
          <Text style={[styles.modeTabText, activeMode === 'Sentence' && styles.activeModeTabText]}>
            2. SENTENCE PRACTICE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeTabBtn, activeMode === 'Shadowing' && styles.activeModeTabBtn]}
          onPress={() => {
            setActiveMode('Shadowing');
            const drill = detailedPronunciationDrills.find((d) => d.mode === 'Shadowing') || detailedPronunciationDrills[0];
            setSelectedDrill(drill);
            setEvaluationResult(null);
          }}
        >
          <Text style={styles.modeTabEmoji}>👤</Text>
          <Text style={[styles.modeTabText, activeMode === 'Shadowing' && styles.activeModeTabText]}>
            3. SHADOWING
          </Text>
        </TouchableOpacity>
      </View>

      {/* Drill Carousel */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.drillCarousel}>
        {filteredDrills.map((drill) => {
          const isSelected = !useCustomText && selectedDrill.id === drill.id;
          return (
            <TouchableOpacity
              key={drill.id}
              style={[styles.drillCard, isSelected && styles.activeDrillCard]}
              onPress={() => {
                setSelectedDrill(drill);
                setUseCustomText(false);
                setEvaluationResult(null);
              }}
            >
              <Text style={styles.drillTag}>{drill.topicTag.toUpperCase()}</Text>
              <Text style={styles.drillPhraseText} numberOfLines={2}>{drill.phrase}</Text>
              <Text style={styles.drillIpaText}>{drill.ipa}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Custom Sentence Input Toggle */}
      <View style={styles.customBox}>
        <TouchableOpacity style={styles.customToggle} onPress={() => setUseCustomText(!useCustomText)}>
          <Text style={styles.customToggleText}>
            {useCustomText ? '✓ Using Custom Text' : '✏️ Practice Any Custom Word or Sentence You Type'}
          </Text>
        </TouchableOpacity>

        {useCustomText && (
          <TextInput
            style={styles.customInput}
            placeholder="Type any word or sentence you want to analyze..."
            placeholderTextColor={colors.textMuted}
            value={customText}
            onChangeText={setCustomText}
          />
        )}
      </View>

      {/* TARGET PRACTICE DISPLAY CARD */}
      <View style={styles.targetCard}>
        <Text style={styles.targetCardLabel}>TARGET {activeMode.toUpperCase()} TO PRACTICE</Text>
        <Text style={styles.targetMainText}>"{targetText}"</Text>
        {!useCustomText && <Text style={styles.targetIpaText}>Target IPA: {selectedDrill.ipa}</Text>}

        {/* Audio Controls */}
        <View style={styles.audioRow}>
          <AudioButton text={targetText} labelOverride="🔊 Normal Speed" size="medium" />
          <AudioButton text={targetText} slowMode={true} labelOverride="🐢 Slow Speed" size="medium" />
          <AudioButton text={targetText} gender="female" labelOverride="👩 Lady Voice" size="medium" />
          <AudioButton text={targetText} gender="male" labelOverride="👨 Male Voice" size="medium" />
        </View>

        {!useCustomText && (
          <View style={styles.tipBox}>
            <Text style={styles.tipHeading}>💡 Supportive Pronunciation Tip:</Text>
            <Text style={styles.tipBody}>{selectedDrill.tips}</Text>
          </View>
        )}
      </View>

      {/* Record CTA Button */}
      <TouchableOpacity
        style={[styles.recordBtn, isRecording && styles.recordingActiveBtn]}
        onPress={isRecording ? handleStopRecording : handleStartRecording}
      >
        <Text style={styles.recordBtnText}>
          {isRecording ? '⏹️ Stop Recording & Analyze Pronunciation' : '🎤 Tap to Record Your Voice'}
        </Text>
      </TouchableOpacity>

      {/* COLOR-CODED PERFORMANCE HIGHLIGHTING & EVALUATION REPORT */}
      {evaluationResult && (
        <View style={styles.evalContainer}>
          <Text style={styles.evalHeaderTitle}>📊 Pronunciation Feedback Report</Text>

          {/* Overall Accuracy Score Banner */}
          <View style={styles.scoreBanner}>
            <Text style={styles.scoreValText}>{evaluationResult.accuracyScore}%</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.scoreLabelText}>OVERALL PRONUNCIATION SCORE</Text>
              <Text style={styles.scoreEncouragement}>
                {evaluationResult.accuracyScore >= 85
                  ? '🌟 Excellent articulation! Keep up the great momentum.'
                  : '👍 Great effort! Review the highlighted words below to perfect your sound.'}
              </Text>
            </View>
          </View>

          {/* Color-Coded Word Sentence Display */}
          <Text style={styles.sectionHeaderTitle}>Performance Breakdown by Word:</Text>
          <View style={styles.colorWordsRow}>
            {evaluationResult.wordFeedback.map((wf, idx) => {
              let chipBg = '#052E16'; // Green
              let textColor = colors.secondary;
              if (wf.status === 'yellow') {
                chipBg = '#451A03'; // Yellow
                textColor = colors.warning;
              } else if (wf.status === 'red') {
                chipBg = '#450A0A'; // Red
                textColor = colors.danger;
              }

              return (
                <View key={idx} style={[styles.wordChip, { backgroundColor: chipBg }]}>
                  <Text style={[styles.wordChipText, { color: textColor }]}>{wf.word}</Text>
                  <Text style={[styles.wordChipScore, { color: textColor }]}>{wf.score}%</Text>
                </View>
              );
            })}
          </View>

          {/* Detailed Breakdown Card for Tricky Words */}
          {!useCustomText && selectedDrill.phoneticApproximation && (
            <View style={styles.breakdownCard}>
              <Text style={styles.breakdownHeading}>🔍 Detailed Word Breakdown:</Text>

              <View style={styles.bdRow}>
                <Text style={styles.bdKey}>WORD:</Text>
                <Text style={styles.bdVal}>{selectedDrill.phrase}</Text>
              </View>
              <View style={styles.bdRow}>
                <Text style={styles.bdKey}>YOUR PRONUNCIATION:</Text>
                <Text style={styles.bdVal}>{selectedDrill.phoneticApproximation}</Text>
              </View>
              <View style={styles.bdRow}>
                <Text style={styles.bdKey}>TARGET PRONUNCIATION (IPA):</Text>
                <Text style={styles.bdValIPA}>{selectedDrill.ipa}</Text>
              </View>
              <View style={styles.bdRow}>
                <Text style={styles.bdKey}>SYLLABLE BREAKDOWN:</Text>
                <Text style={styles.bdVal}>{selectedDrill.syllableBreakdown.join(' - ')}</Text>
              </View>
            </View>
          )}

          {/* Audio Compare Tools */}
          <View style={styles.compareBox}>
            <Text style={styles.compareHeading}>🎧 Audio Comparison & Re-try:</Text>
            <View style={styles.compareRow}>
              <AudioButton text={targetText} labelOverride="🔊 Reference Audio" size="medium" />
              <TouchableOpacity style={styles.reRecordBtn} onPress={handleStartRecording}>
                <Text style={styles.reRecordBtnText}>🎤 Record Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* ❤️ MY WEAK WORDS COLLECTION SECTION */}
      <View style={styles.weakWordsSection}>
        <Text style={styles.sectionHeaderTitle}>❤️ My Weak Words Collection</Text>
        <Text style={styles.weakWordsSub}>Words requiring extra practice are automatically saved here for supportive review.</Text>

        {weakWords.length === 0 ? (
          <View style={styles.emptyWeakCard}>
            <Text style={styles.emptyWeakText}>No weak words collected yet! Keep practicing.</Text>
          </View>
        ) : (
          weakWords.map((item, idx) => (
            <View key={idx} style={styles.weakWordCard}>
              <View style={styles.weakWordTop}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.weakWordTitle}>{item.word}</Text>
                  <Text style={styles.weakWordIpa}>{item.ipa}</Text>
                </View>
                <AudioButton text={item.word} size="small" />
              </View>
              <Text style={styles.weakWordTip}>💡 Tip: {item.tip}</Text>
            </View>
          ))
        )}
      </View>
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
  accentBox: {
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  accentLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 8,
  },
  accentRow: {
    flexDirection: 'row',
    gap: 6,
  },
  accentBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  activeAccentBtn: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  accentBtnText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 10,
  },
  sectionHeaderTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
  },
  modeTabsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  modeTabBtn: {
    flex: 1,
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  activeModeTabBtn: {
    backgroundColor: '#1E1B4B',
    borderColor: colors.primary,
    borderWidth: 2,
  },
  modeTabEmoji: {
    fontSize: 18,
    marginBottom: 4,
  },
  modeTabText: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: '800',
    textAlign: 'center',
  },
  activeModeTabText: {
    color: colors.primary,
  },
  drillCarousel: {
    marginBottom: 14,
  },
  drillCard: {
    width: 200,
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  activeDrillCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  drillTag: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '900',
    marginBottom: 4,
  },
  drillPhraseText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  drillIpaText: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 4,
  },
  customBox: {
    marginBottom: 16,
  },
  customToggle: {
    paddingVertical: 4,
  },
  customToggleText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  customInput: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 12,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginTop: 6,
  },
  targetCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: 16,
  },
  targetCardLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 6,
  },
  targetMainText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 4,
  },
  targetIpaText: {
    color: colors.primary,
    fontSize: 13,
    marginBottom: 12,
  },
  audioRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 12,
  },
  tipBox: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    width: '100%',
  },
  tipHeading: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 2,
  },
  tipBody: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
  recordBtn: {
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 18,
  },
  recordingActiveBtn: {
    backgroundColor: colors.danger,
  },
  recordBtnText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 15,
  },

  // Evaluation & Feedback Report
  evalContainer: {
    gap: 14,
    marginBottom: 20,
  },
  evalHeaderTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  scoreBanner: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  scoreValText: {
    color: colors.primary,
    fontSize: 32,
    fontWeight: '900',
  },
  scoreLabelText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '900',
  },
  scoreEncouragement: {
    color: colors.text,
    fontSize: 12,
    marginTop: 2,
  },
  colorWordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  wordChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: 'center',
  },
  wordChipText: {
    fontSize: 13,
    fontWeight: '800',
  },
  wordChipScore: {
    fontSize: 10,
    fontWeight: '700',
  },
  breakdownCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 6,
  },
  breakdownHeading: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 4,
  },
  bdRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bdKey: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
  },
  bdVal: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  bdValIPA: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  compareBox: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 14,
  },
  compareHeading: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 8,
  },
  compareRow: {
    flexDirection: 'row',
    gap: 10,
  },
  reRecordBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reRecordBtnText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 12,
  },

  // Weak Words Section
  weakWordsSection: {
    marginBottom: 30,
  },
  weakWordsSub: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: -6,
    marginBottom: 12,
  },
  emptyWeakCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
  },
  emptyWeakText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  weakWordCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  weakWordTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  weakWordTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  weakWordIpa: {
    color: colors.primary,
    fontSize: 11,
  },
  weakWordTip: {
    color: colors.textMuted,
    fontSize: 11,
    fontStyle: 'italic',
  },
});
