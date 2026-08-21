import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { colors } from '../theme/colors';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { lessonsBasics } from '../data/lessonsBasics';
import { lessonsIntermediate } from '../data/lessonsIntermediate';
import { lessonsAdvanced } from '../data/lessonsAdvanced';
import { businessEnglishLessons } from '../data/businessEnglish';
import { LessonItem, LearningPhase } from '../types';
import { AudioButton } from '../components/AudioButton';

interface PhaseLessonsScreenProps {
  phase?: LearningPhase;
  onBack?: () => void;
}

export const PhaseLessonsScreen: React.FC<PhaseLessonsScreenProps> = ({
  phase: initialPhase,
  onBack,
}) => {
  const { user } = useAuth();
  const { markLessonComplete, completedLessons } = useProgress();
  const [activePhase, setActivePhase] = useState<LearningPhase>(
    initialPhase || user?.phase || 'basics'
  );
  const [selectedLesson, setSelectedLesson] = useState<LessonItem | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const getLessons = (): LessonItem[] => {
    switch (activePhase) {
      case 'basics': return lessonsBasics;
      case 'intermediate': return lessonsIntermediate;
      case 'advanced': return lessonsAdvanced;
      case 'business': return businessEnglishLessons;
      default: return lessonsBasics;
    }
  };

  const currentLessons = getLessons();

  const handleCompleteLesson = () => {
    if (selectedLesson) {
      markLessonComplete(selectedLesson.id, selectedLesson.xpPoints);
      setSelectedLesson(null);
      setSelectedAnswer(null);
      setQuizSubmitted(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Phase Switcher Tabs */}
      <View style={styles.tabContainer}>
        {(['basics', 'intermediate', 'advanced', 'business'] as LearningPhase[]).map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.tab, activePhase === p && styles.activeTab]}
            onPress={() => setActivePhase(p)}
          >
            <Text style={[styles.tabText, activePhase === p && styles.activeTabText]}>
              {p.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollList}>
        {currentLessons.map((lesson) => {
          const isDone = completedLessons.includes(lesson.id);
          return (
            <TouchableOpacity
              key={lesson.id}
              style={[styles.lessonCard, isDone && styles.doneCard]}
              onPress={() => {
                setSelectedLesson(lesson);
                setSelectedAnswer(null);
                setQuizSubmitted(false);
              }}
            >
              <View style={styles.lessonHeader}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{lesson.category}</Text>
                </View>
                <Text style={styles.xpText}>+{lesson.xpPoints} XP</Text>
              </View>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.lessonDesc}>{lesson.description}</Text>
              <View style={styles.lessonFooter}>
                <Text style={styles.durationText}>⏱️ {lesson.durationMins} mins</Text>
                <Text style={styles.statusText}>{isDone ? '✅ Completed' : '▶️ Start Lesson'}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Lesson Interactive Modal */}
      {selectedLesson && (
        <Modal animationType="slide" visible={true} transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedLesson.title}</Text>
                <TouchableOpacity onPress={() => setSelectedLesson(null)}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody}>
                {/* Vocabulary Cards */}
                <Text style={styles.modalSectionTitle}>Key Vocabulary & Pronunciation</Text>
                {selectedLesson.vocabulary.map((vocab, i) => (
                  <View key={i} style={styles.vocabCard}>
                    <View style={styles.vocabHeader}>
                      <View>
                        <Text style={styles.vocabWord}>{vocab.word}</Text>
                        <Text style={styles.vocabPhonetic}>{vocab.phonetic}</Text>
                      </View>
                      <AudioButton text={vocab.word} size="small" />
                    </View>
                    <Text style={styles.vocabDef}>{vocab.definition}</Text>
                    <Text style={styles.vocabExample}>Example: "{vocab.example}"</Text>
                  </View>
                ))}

                {/* Grammar Rule */}
                {selectedLesson.grammarRule && (
                  <View style={styles.grammarBox}>
                    <Text style={styles.grammarTitle}>📌 {selectedLesson.grammarRule.title}</Text>
                    <Text style={styles.grammarExp}>{selectedLesson.grammarRule.explanation}</Text>
                    {selectedLesson.grammarRule.examples.map((ex, idx) => (
                      <Text key={idx} style={styles.grammarExample}>• {ex}</Text>
                    ))}
                  </View>
                )}

                {/* Quiz check */}
                {selectedLesson.quizQuestions && selectedLesson.quizQuestions.length > 0 && (
                  <View style={styles.quizBox}>
                    <Text style={styles.modalSectionTitle}>Interactive Quiz Check</Text>
                    {selectedLesson.quizQuestions.map((q, qIdx) => (
                      <View key={qIdx} style={styles.qContainer}>
                        <Text style={styles.qText}>{q.question}</Text>
                        {q.options.map((opt, optIdx) => {
                          const isSelected = selectedAnswer === optIdx;
                          const isCorrect = q.correctIndex === optIdx;
                          let bg = '#0F172A';
                          if (quizSubmitted) {
                            if (isCorrect) bg = colors.success;
                            else if (isSelected) bg = colors.danger;
                          } else if (isSelected) {
                            bg = colors.primary;
                          }

                          return (
                            <TouchableOpacity
                              key={optIdx}
                              style={[styles.optBtn, { backgroundColor: bg }]}
                              onPress={() => setSelectedAnswer(optIdx)}
                            >
                              <Text style={styles.optText}>{opt}</Text>
                            </TouchableOpacity>
                          );
                        })}
                        {!quizSubmitted ? (
                          <TouchableOpacity
                            style={styles.checkQuizBtn}
                            onPress={() => setQuizSubmitted(true)}
                          >
                            <Text style={styles.checkQuizText}>Submit Answer</Text>
                          </TouchableOpacity>
                        ) : (
                          <Text style={styles.quizFeedback}>{q.explanation}</Text>
                        )}
                      </View>
                    ))}
                  </View>
                )}
              </ScrollView>

              <TouchableOpacity style={styles.completeBtn} onPress={handleCompleteLesson}>
                <Text style={styles.completeBtnText}>Mark Lesson Complete (+{selectedLesson.xpPoints} XP)</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.textMuted,
    fontWeight: '800',
    fontSize: 10,
  },
  activeTabText: {
    color: '#FFF',
  },
  scrollList: {
    padding: 16,
  },
  lessonCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  doneCard: {
    borderColor: colors.success,
    backgroundColor: '#064E3B20',
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
  },
  xpText: {
    color: colors.accent,
    fontWeight: '800',
    fontSize: 12,
  },
  lessonTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  lessonDesc: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
    marginBottom: 12,
  },
  lessonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationText: {
    color: colors.textMuted,
    fontSize: 11,
  },
  statusText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.cardBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    flex: 1,
  },
  closeText: {
    color: colors.textMuted,
    fontSize: 20,
    padding: 4,
  },
  modalBody: {
    marginBottom: 16,
  },
  modalSectionTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 8,
  },
  vocabCard: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  vocabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  vocabWord: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  vocabPhonetic: {
    color: colors.primary,
    fontSize: 11,
  },
  vocabDef: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  vocabExample: {
    color: colors.textMuted,
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 4,
  },
  grammarBox: {
    backgroundColor: '#1E1B4B',
    borderRadius: 12,
    padding: 12,
    marginVertical: 12,
  },
  grammarTitle: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 14,
  },
  grammarExp: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  grammarExample: {
    color: colors.accent,
    fontSize: 12,
  },
  quizBox: {
    marginTop: 12,
  },
  qContainer: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
  },
  qText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 13,
    marginBottom: 10,
  },
  optBtn: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  optText: {
    color: '#FFF',
    fontSize: 12,
  },
  checkQuizBtn: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  checkQuizText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 12,
  },
  quizFeedback: {
    color: colors.success,
    fontSize: 11,
    marginTop: 8,
  },
  completeBtn: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeBtnText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 15,
  },
});
