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
import { pronunciationDrills, PronunciationDrill } from '../data/pronunciationDrills';
import { AudioButton } from '../components/AudioButton';
import { PronunciationCard } from '../components/PronunciationCard';
import { SpeechEngine, VoiceAccent } from '../services/speech';
import { ApiService } from '../services/api';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { PronunciationEvaluation } from '../types';

export const SpeakingLabScreen: React.FC = () => {
  const { user } = useAuth();
  const { addSpokenRecord } = useProgress();
  const [selectedDrill, setSelectedDrill] = useState<PronunciationDrill>(pronunciationDrills[0]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeAccent, setActiveAccent] = useState<VoiceAccent>('en-IN'); // Warm Indian English default
  const [customText, setCustomText] = useState('');
  const [useCustomText, setUseCustomText] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [userSpeech, setUserSpeech] = useState('');
  const [evaluationResult, setEvaluationResult] = useState<PronunciationEvaluation | null>(null);

  const categories = ['All', 'Basics', 'Intermediate', 'Advanced', 'Business', 'Daily Life', 'Travel', 'Work', 'Interview'];

  const filteredDrills = pronunciationDrills.filter((drill) => {
    const matchesCategory =
      activeCategoryFilter === 'All' ||
      drill.phase.toLowerCase() === activeCategoryFilter.toLowerCase() ||
      drill.topicTag.toLowerCase() === activeCategoryFilter.toLowerCase();

    const matchesSearch =
      !searchQuery.trim() ||
      drill.phrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drill.topicTag.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

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
      user?.id || null,
      target,
      spoken,
      selectedDrill.phase
    );
    setEvaluationResult(result);

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
      <Text style={styles.title}>🎙️ Speaking & Pronunciation Practice Lab</Text>
      <Text style={styles.subtitle}>
        Select from dozens of practice sentences, listen in warm natural voices (Indian English en-IN), and get instant accuracy scoring.
      </Text>

      {/* Voice Accent & Warm Voice Selector */}
      <View style={styles.accentSelectorBox}>
        <Text style={styles.accentBoxLabel}>Select Preferred Voice Accent:</Text>
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

      {/* Sentence Category Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {categories.map((cat) => {
          const isActive = activeCategoryFilter === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.filterChip, isActive && styles.activeFilterChip]}
              onPress={() => setActiveCategoryFilter(cat)}
            >
              <Text style={[styles.filterChipText, isActive && styles.activeFilterChipText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Search Input for Sentences */}
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Search sentences by topic (e.g. coffee, interview, directions)..."
        placeholderTextColor={colors.textMuted}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Drill Sentence Carousel */}
      <Text style={styles.sectionHeader}>Practice Sentence Bank ({filteredDrills.length} Sentences)</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
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
              <View style={styles.drillBadgeRow}>
                <Text style={styles.phaseBadge}>{drill.phase.toUpperCase()}</Text>
                <Text style={styles.catBadge}>{drill.topicTag}</Text>
              </View>
              <Text style={styles.drillPhrase} numberOfLines={2}>{drill.phrase}</Text>
              <Text style={styles.drillPhonetic}>{drill.phonetic}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Custom Sentence Input Toggle */}
      <View style={styles.customBox}>
        <TouchableOpacity
          style={styles.customToggle}
          onPress={() => setUseCustomText(!useCustomText)}
        >
          <Text style={styles.customToggleText}>
            {useCustomText ? '✓ Using Custom Sentence' : '✏️ Practice Any Custom Sentence You Type'}
          </Text>
        </TouchableOpacity>

        {useCustomText && (
          <TextInput
            style={styles.customInput}
            placeholder="Type any word or sentence you want to speak and evaluate..."
            placeholderTextColor={colors.textMuted}
            value={customText}
            onChangeText={setCustomText}
          />
        )}
      </View>

      {/* Target Sentence Display Card */}
      <View style={styles.targetCard}>
        <Text style={styles.targetLabel}>TARGET SENTENCE TO SPEAK</Text>
        <Text style={styles.targetText}>"{targetText}"</Text>
        {!useCustomText && (
          <Text style={styles.phoneticText}>{selectedDrill.phonetic}</Text>
        )}

        {/* Audio Listen Buttons (Warm Lady Voice vs Male Voice) */}
        <View style={styles.audioRow}>
          <AudioButton text={targetText} gender="female" labelOverride="👩 Lady Voice (Warm)" size="medium" />
          <AudioButton text={targetText} gender="male" labelOverride="👨 Male Voice (Warm)" size="medium" />
          <AudioButton text={targetText} slowMode={true} labelOverride="🐢 Listen Slow" size="medium" />
        </View>

        {!useCustomText && (
          <View style={styles.tipBox}>
            <Text style={styles.tipText}>💡 Pronunciation Tip: {selectedDrill.tips}</Text>
          </View>
        )}
      </View>

      {/* Record Button */}
      <TouchableOpacity
        style={[styles.recordBtn, isRecording && styles.recordingActiveBtn]}
        onPress={isRecording ? handleStopRecording : handleStartRecording}
      >
        <Text style={styles.recordBtnText}>
          {isRecording ? '⏹️ Stop & Check Pronunciation Accuracy' : '🎤 Tap to Record & Evaluate Your Speech'}
        </Text>
      </TouchableOpacity>

      {/* Evaluation Results Card */}
      {evaluationResult && (
        <PronunciationCard evaluation={evaluationResult} />
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
  accentSelectorBox: {
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  accentBoxLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 8,
  },
  accentRow: {
    flexDirection: 'row',
    gap: 8,
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
    fontSize: 11,
  },
  filterScroll: {
    marginBottom: 10,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#0F172A',
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: colors.accent,
  },
  filterChipText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  activeFilterChipText: {
    color: '#0F172A',
    fontWeight: '900',
  },
  searchInput: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 12,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: 14,
  },
  sectionHeader: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
  },
  carousel: {
    marginBottom: 16,
  },
  drillCard: {
    width: 230,
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
  drillBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  phaseBadge: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '900',
  },
  catBadge: {
    color: colors.accent,
    fontSize: 9,
    fontWeight: '700',
  },
  drillPhrase: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 14,
  },
  drillPhonetic: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 4,
  },
  customBox: {
    marginBottom: 16,
  },
  customToggle: {
    paddingVertical: 6,
  },
  customToggleText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
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
  targetLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 6,
  },
  targetText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 4,
  },
  phoneticText: {
    color: colors.primary,
    fontSize: 13,
    marginBottom: 14,
  },
  audioRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 10,
    justifyContent: 'center',
  },
  tipBox: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: '100%',
  },
  tipText: {
    color: colors.accent,
    fontSize: 12,
    textAlign: 'center',
  },
  recordBtn: {
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  recordingActiveBtn: {
    backgroundColor: colors.danger,
  },
  recordBtnText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 15,
  },
});
