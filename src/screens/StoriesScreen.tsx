import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors } from '../theme/colors';
import { practiceStories } from '../data/stories';
import { PracticeStory, StoryParagraph } from '../types';
import { AudioButton } from '../components/AudioButton';
import { useProgress } from '../context/ProgressContext';
import { VoiceGender } from '../services/speech';

export const StoriesScreen: React.FC = () => {
  const { addXP } = useProgress();
  const [selectedStory, setSelectedStory] = useState<PracticeStory>(practiceStories[0]);
  const [selectedGender, setSelectedGender] = useState<VoiceGender>('female'); // Lady voice default
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<{ [key: string]: boolean }>({});

  const handleSelectQuizOption = (pId: string, optIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [pId]: optIdx }));
  };

  const handleSubmitQuiz = (pId: string, correctIdx: number) => {
    setSubmittedQuiz((prev) => ({ ...prev, [pId]: true }));
    if (quizAnswers[pId] === correctIdx) {
      addXP(20);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Comprehensive Read & Practice Stories</Text>
      <Text style={styles.subtitle}>
        Listen to full stories narrated in lady & male voices, practice reading aloud, and test your comprehension.
      </Text>

      {/* Story Selector Carousel */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
        {practiceStories.map((story) => {
          const isSelected = selectedStory.id === story.id;
          return (
            <TouchableOpacity
              key={story.id}
              style={[styles.storyCard, isSelected && styles.activeStoryCard]}
              onPress={() => {
                setSelectedStory(story);
                setQuizAnswers({});
                setSubmittedQuiz({});
              }}
            >
              <Image source={{ uri: story.coverImage }} style={styles.coverImg} />
              <Text style={styles.genreTag}>{story.genre} • {story.phase.toUpperCase()}</Text>
              <Text style={styles.storyCardTitle} numberOfLines={2}>{story.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Active Story Reader */}
      <View style={styles.readerCard}>
        <View style={styles.readerHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.phaseBadge}>{selectedStory.phase.toUpperCase()} PHASE STORY</Text>
            <Text style={styles.readerTitle}>{selectedStory.title}</Text>
            <Text style={styles.readerSubtitle}>{selectedStory.subtitle}</Text>
          </View>

          {/* Voice Gender Switcher */}
          <View style={styles.voiceGenderToggle}>
            <Text style={styles.voiceGenderLabel}>Narrator Voice:</Text>
            <View style={styles.genderBtnRow}>
              <TouchableOpacity
                style={[styles.genderBtn, selectedGender === 'female' && styles.femaleActiveBtn]}
                onPress={() => setSelectedGender('female')}
              >
                <Text style={styles.genderBtnText}>👩 Lady Voice</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.genderBtn, selectedGender === 'male' && styles.maleActiveBtn]}
                onPress={() => setSelectedGender('male')}
              >
                <Text style={styles.genderBtnText}>👨 Male Voice</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Paragraphs Breakdown */}
        {selectedStory.paragraphs.map((p, idx) => (
          <View key={p.id} style={styles.paragraphBox}>
            <View style={styles.paraHeader}>
              <Text style={styles.paraNumber}>Paragraph {idx + 1}</Text>
              <AudioButton
                text={p.text}
                gender={selectedGender}
                size="medium"
                labelOverride={selectedGender === 'female' ? 'Listen Lady Voice' : 'Listen Male Voice'}
              />
            </View>
            <Text style={styles.paraText}>{p.text}</Text>

            {/* Vocabulary Highlights */}
            {p.keyWords && p.keyWords.length > 0 && (
              <View style={styles.vocabBox}>
                <Text style={styles.vocabBoxHeading}>Key Vocabulary:</Text>
                {p.keyWords.map((kw, kIdx) => (
                  <View key={kIdx} style={styles.kwRow}>
                    <Text style={styles.kwWord}>{kw.word}:</Text>
                    <Text style={styles.kwDef}>{kw.definition}</Text>
                    <AudioButton text={kw.word} gender={selectedGender} size="small" />
                  </View>
                ))}
              </View>
            )}

            {/* Comprehension Quiz Check */}
            {p.comprehensionQuestion && (
              <View style={styles.quizCard}>
                <Text style={styles.quizQuestion}>{p.comprehensionQuestion.question}</Text>
                {p.comprehensionQuestion.options.map((opt, oIdx) => {
                  const isSelected = quizAnswers[p.id] === oIdx;
                  const isSubmitted = submittedQuiz[p.id];
                  const isCorrect = p.comprehensionQuestion?.correctIndex === oIdx;

                  let optionBg = '#0F172A';
                  if (isSubmitted) {
                    if (isCorrect) optionBg = colors.success;
                    else if (isSelected) optionBg = colors.danger;
                  } else if (isSelected) {
                    optionBg = colors.primary;
                  }

                  return (
                    <TouchableOpacity
                      key={oIdx}
                      style={[styles.quizOptBtn, { backgroundColor: optionBg }]}
                      onPress={() => handleSelectQuizOption(p.id, oIdx)}
                    >
                      <Text style={styles.quizOptText}>{opt}</Text>
                    </TouchableOpacity>
                  );
                })}

                {!submittedQuiz[p.id] ? (
                  <TouchableOpacity
                    style={styles.submitQuizBtn}
                    onPress={() => handleSubmitQuiz(p.id, p.comprehensionQuestion!.correctIndex)}
                  >
                    <Text style={styles.submitQuizText}>Check Answer (+20 XP)</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.quizExplanation}>
                    {p.comprehensionQuestion.explanation}
                  </Text>
                )}
              </View>
            )}
          </View>
        ))}
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
    marginBottom: 16,
  },
  carousel: {
    marginBottom: 20,
  },
  storyCard: {
    width: 210,
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  activeStoryCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  coverImg: {
    width: '100%',
    height: 110,
    borderRadius: 10,
    marginBottom: 8,
  },
  genreTag: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: '800',
  },
  storyCardTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    marginTop: 2,
  },
  readerCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  readerHeader: {
    marginBottom: 16,
  },
  phaseBadge: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  readerTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 2,
  },
  readerSubtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  voiceGenderToggle: {
    marginTop: 12,
    backgroundColor: '#0F172A',
    padding: 10,
    borderRadius: 12,
  },
  voiceGenderLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 6,
  },
  genderBtnRow: {
    flexDirection: 'row',
    gap: 8,
  },
  genderBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.cardBg,
    alignItems: 'center',
  },
  femaleActiveBtn: {
    backgroundColor: '#EC4899',
  },
  maleActiveBtn: {
    backgroundColor: '#3B82F6',
  },
  genderBtnText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 12,
  },
  paragraphBox: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  paraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  paraNumber: {
    color: colors.accent,
    fontWeight: '800',
    fontSize: 12,
  },
  paraText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
  },
  vocabBox: {
    backgroundColor: colors.cardBg,
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
  },
  vocabBoxHeading: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 6,
  },
  kwRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  kwWord: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 12,
  },
  kwDef: {
    color: colors.textMuted,
    fontSize: 11,
    flex: 1,
    marginLeft: 6,
  },
  quizCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  quizQuestion: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
  },
  quizOptBtn: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  quizOptText: {
    color: '#FFF',
    fontSize: 12,
  },
  submitQuizBtn: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  submitQuizText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 12,
  },
  quizExplanation: {
    color: colors.success,
    fontSize: 11,
    marginTop: 6,
  },
});
