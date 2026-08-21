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
import { structuredCurriculumSystem, CurriculumCategory, CurriculumLesson } from '../data/curriculumSystem';
import { AudioButton } from '../components/AudioButton';
import { SpeechEngine } from '../services/speech';
import { ApiService } from '../services/api';
import { PronunciationCard } from '../components/PronunciationCard';
import { useProgress } from '../context/ProgressContext';
import { PronunciationEvaluation } from '../types';

export const PhaseLessonsScreen: React.FC = () => {
  const { addXP, markLessonComplete, addSpokenRecord } = useProgress();
  const [selectedCategory, setSelectedCategory] = useState<CurriculumCategory>(structuredCurriculumSystem[0]);
  const [activeLesson, setActiveLesson] = useState<CurriculumLesson | null>(null);
  const [activeActivityIndex, setActiveActivityIndex] = useState<number>(0);

  // Activity Quiz State
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);

  // Speak Activity State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [spokenText, setSpokenText] = useState<string>('');
  const [evaluation, setEvaluation] = useState<PronunciationEvaluation | null>(null);

  const category = selectedCategory;

  const handleStartLesson = (lesson: CurriculumLesson) => {
    setActiveLesson(lesson);
    setActiveActivityIndex(0);
    setSelectedAns(null);
    setSubmittedQuiz(false);
    setEvaluation(null);
    setSpokenText('');
  };

  const handleNextActivity = () => {
    if (!activeLesson) return;
    if (activeActivityIndex < activeLesson.activities.length - 1) {
      setActiveActivityIndex((prev) => prev + 1);
      setSelectedAns(null);
      setSubmittedQuiz(false);
    } else {
      // Completed Lesson!
      markLessonComplete(activeLesson.id, 30);
      setActiveLesson(null);
    }
  };

  const handleStartRecording = (targetSentence: string) => {
    setIsRecording(true);
    setSpokenText('');
    setEvaluation(null);

    SpeechEngine.startListening(
      (text) => {
        setSpokenText(text);
      },
      (err) => {
        setIsRecording(false);
        evaluateSpeech(targetSentence, targetSentence);
      }
    );
  };

  const handleStopRecording = (targetSentence: string) => {
    setIsRecording(false);
    evaluateSpeech(targetSentence, spokenText || targetSentence);
  };

  const evaluateSpeech = async (target: string, spoken: string) => {
    const result = await ApiService.evaluatePronunciation(
      1,
      target,
      spoken,
      'intermediate'
    );
    setEvaluation(result);

    await addSpokenRecord({
      phraseText: target,
      userTranscription: spoken,
      accuracyScore: result.accuracyScore,
      phase: 'intermediate',
      feedbackDetails: result.wordFeedback,
      createdAt: new Date().toISOString(),
    });
  };

  const currentActivity = activeLesson?.activities[activeActivityIndex];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Structured English Curriculum System</Text>
      <Text style={styles.screenSub}>8 Specialized Categories • 3-10 Min Guided Speaking & Workplace Lessons.</Text>

      {/* Category Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {structuredCurriculumSystem.map((cat) => {
          const isSelected = selectedCategory.id === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.catChip, isSelected && { backgroundColor: cat.color, borderColor: cat.color }]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={styles.catIcon}>{cat.icon}</Text>
              <Text style={[styles.catText, isSelected && styles.catTextActive]}>
                {cat.categoryName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Active Category Header */}
      <View style={[styles.catHeaderCard, { borderColor: category.color }]}>
        <View style={styles.catHeaderLeft}>
          <Text style={styles.catHeaderIcon}>{category.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.catHeaderTitle}>{category.categoryName}</Text>
            <Text style={styles.catHeaderDesc}>{category.description}</Text>
          </View>
        </View>
      </View>

      {/* Modules & Lessons List */}
      {category.modules.map((mod) => (
        <View key={mod.id} style={styles.moduleCard}>
          <Text style={styles.moduleTitle}>{mod.title}</Text>
          <Text style={styles.moduleDesc}>{mod.description}</Text>

          {mod.lessons.map((les) => (
            <TouchableOpacity
              key={les.id}
              style={styles.lessonItem}
              onPress={() => handleStartLesson(les)}
            >
              <View style={styles.lessonLeft}>
                <View style={[styles.timeTag, { backgroundColor: category.color }]}>
                  <Text style={styles.timeTagText}>⏱️ {les.estimatedTimeMins} mins</Text>
                </View>
                <Text style={styles.lessonTitle}>{les.title}</Text>
                <Text style={styles.lessonContext}>{les.situationContext}</Text>
              </View>

              <View style={[styles.startPill, { backgroundColor: category.color }]}>
                <Text style={styles.startPillText}>Start ›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* ACTIVE LESSON MODAL: 6-STEP ACTIVITIES */}
      {activeLesson && currentActivity && (
        <Modal animationType="slide" visible={!!activeLesson} transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.modalLessonCategory}>{category.categoryName.toUpperCase()}</Text>
                  <Text style={styles.modalLessonTitle}>{activeLesson.title}</Text>
                </View>
                <TouchableOpacity onPress={() => setActiveLesson(null)}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Activity Step Bar */}
              <View style={styles.activityStepBar}>
                {activeLesson.activities.map((act, idx) => {
                  const isCurrent = activeActivityIndex === idx;
                  const isDone = activeActivityIndex > idx;
                  return (
                    <View
                      key={act.id}
                      style={[
                        styles.actDot,
                        isCurrent && styles.actDotCurrent,
                        isDone && styles.actDotDone,
                      ]}
                    >
                      <Text style={styles.actDotText}>{isDone ? '✓' : idx + 1}</Text>
                    </View>
                  );
                })}
              </View>

              {/* Activity Content Body */}
              <ScrollView style={styles.actBodyScroll}>
                <View style={styles.actTypeBadge}>
                  <Text style={styles.actTypeText}>{currentActivity.type} ACTIVITY</Text>
                </View>
                <Text style={styles.actTitle}>{currentActivity.title}</Text>

                {/* 1. LEARN ACTIVITY */}
                {currentActivity.type === 'LEARN' && currentActivity.learnPhrases && (
                  <View style={styles.activityBox}>
                    {currentActivity.learnPhrases.map((lp, idx) => (
                      <View key={idx} style={styles.phraseCard}>
                        <View style={styles.phraseCardTop}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.phraseCardText}>"{lp.phrase}"</Text>
                            <Text style={styles.phraseCardPhonetic}>{lp.phonetic}</Text>
                          </View>
                          <AudioButton text={lp.phrase} size="small" />
                        </View>
                        <Text style={styles.phraseCardMeaning}>Meaning: {lp.meaning}</Text>
                        <Text style={styles.phraseCardEx}>Real Life: "{lp.realLifeExample}"</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* 2. LISTEN ACTIVITY */}
                {currentActivity.type === 'LISTEN' && currentActivity.listenDialogue && (
                  <View style={styles.activityBox}>
                    {currentActivity.listenDialogue.map((dl, idx) => (
                      <View key={idx} style={styles.dialogueBox}>
                        <Text style={styles.speakerName}>{dl.speaker}:</Text>
                        <Text style={styles.dialogueText}>"{dl.line}"</Text>
                        <View style={{ marginTop: 6 }}>
                          <AudioButton text={dl.line} gender={dl.gender} size="small" />
                        </View>
                      </View>
                    ))}
                  </View>
                )}

                {/* 3. UNDERSTAND ACTIVITY */}
                {currentActivity.type === 'UNDERSTAND' && currentActivity.understandQuestions && (
                  <View style={styles.activityBox}>
                    {currentActivity.understandQuestions.map((q, idx) => (
                      <View key={idx} style={styles.quizBox}>
                        <Text style={styles.quizQuestion}>{q.question}</Text>
                        {q.options.map((opt, oIdx) => {
                          const isSel = selectedAns === oIdx;
                          const isCorr = q.correctIndex === oIdx;
                          let bg = '#0F172A';
                          if (submittedQuiz) {
                            if (isCorr) bg = colors.success;
                            else if (isSel) bg = colors.danger;
                          } else if (isSel) {
                            bg = colors.primary;
                          }

                          return (
                            <TouchableOpacity
                              key={oIdx}
                              style={[styles.quizOptBtn, { backgroundColor: bg }]}
                              onPress={() => setSelectedAns(oIdx)}
                            >
                              <Text style={styles.quizOptText}>{opt}</Text>
                            </TouchableOpacity>
                          );
                        })}

                        {!submittedQuiz ? (
                          <TouchableOpacity style={styles.checkAnsBtn} onPress={() => setSubmittedQuiz(true)}>
                            <Text style={styles.checkAnsText}>Check Answer</Text>
                          </TouchableOpacity>
                        ) : (
                          <Text style={styles.expText}>{q.explanation}</Text>
                        )}
                      </View>
                    ))}
                  </View>
                )}

                {/* 4. PRACTICE ACTIVITY */}
                {currentActivity.type === 'PRACTICE' && currentActivity.practiceExercise && (
                  <View style={styles.activityBox}>
                    <View style={styles.quizBox}>
                      <Text style={styles.quizQuestion}>{currentActivity.practiceExercise.prompt}</Text>
                      {currentActivity.practiceExercise.options.map((opt, oIdx) => {
                        const isSel = selectedAns === oIdx;
                        const isCorr = currentActivity.practiceExercise?.correctAnswer === opt;
                        let bg = '#0F172A';
                        if (submittedQuiz) {
                          if (isCorr) bg = colors.success;
                          else if (isSel) bg = colors.danger;
                        } else if (isSel) {
                          bg = colors.primary;
                        }

                        return (
                          <TouchableOpacity
                            key={oIdx}
                            style={[styles.quizOptBtn, { backgroundColor: bg }]}
                            onPress={() => setSelectedAns(oIdx)}
                          >
                            <Text style={styles.quizOptText}>{opt}</Text>
                          </TouchableOpacity>
                        );
                      })}

                      {!submittedQuiz ? (
                        <TouchableOpacity style={styles.checkAnsBtn} onPress={() => setSubmittedQuiz(true)}>
                          <Text style={styles.checkAnsText}>Check Answer</Text>
                        </TouchableOpacity>
                      ) : (
                        <Text style={styles.expText}>{currentActivity.practiceExercise.explanation}</Text>
                      )}
                    </View>
                  </View>
                )}

                {/* 5. SPEAK ACTIVITY */}
                {currentActivity.type === 'SPEAK' && currentActivity.speakPrompt && (
                  <View style={styles.activityBox}>
                    <View style={styles.speakCard}>
                      <Text style={styles.speakSituation}>Situation: {currentActivity.speakPrompt.situation}</Text>
                      <Text style={styles.speakTargetText}>"{currentActivity.speakPrompt.targetSentenceToSpeak}"</Text>

                      <View style={styles.speakAudioRow}>
                        <AudioButton
                          text={currentActivity.speakPrompt.targetSentenceToSpeak}
                          gender={currentActivity.speakPrompt.audioHintGender}
                          labelOverride="Listen Pronunciation"
                        />
                      </View>
                    </View>

                    <TouchableOpacity
                      style={[styles.recBtn, isRecording && styles.recActiveBtn]}
                      onPress={
                        isRecording
                          ? () => handleStopRecording(currentActivity.speakPrompt!.targetSentenceToSpeak)
                          : () => handleStartRecording(currentActivity.speakPrompt!.targetSentenceToSpeak)
                      }
                    >
                      <Text style={styles.recBtnText}>
                        {isRecording ? '⏹️ Stop & Score Pronunciation' : '🎤 Record Your Voice'}
                      </Text>
                    </TouchableOpacity>

                    {evaluation && <PronunciationCard evaluation={evaluation} />}
                  </View>
                )}

                {/* 6. FEEDBACK ACTIVITY */}
                {currentActivity.type === 'FEEDBACK' && currentActivity.feedbackData && (
                  <View style={styles.activityBox}>
                    <View style={styles.feedbackCard}>
                      <Text style={styles.fbScoreVal}>{currentActivity.feedbackData.fluencyScore}%</Text>
                      <Text style={styles.fbScoreLbl}>Fluency Score</Text>

                      <View style={styles.fbItemBox}>
                        <Text style={styles.fbHeader}>✍️ Grammar Correction:</Text>
                        <Text style={styles.fbBody}>{currentActivity.feedbackData.grammarCorrection}</Text>
                      </View>

                      <View style={styles.fbItemBox}>
                        <Text style={styles.fbHeader}>💡 More Natural Sentence (Native Phrasing):</Text>
                        <Text style={styles.fbBodyAlt}>{currentActivity.feedbackData.nativeAlternative}</Text>
                        <AudioButton text={currentActivity.feedbackData.nativeAlternative} size="small" />
                      </View>

                      <View style={styles.fbItemBox}>
                        <Text style={styles.fbHeader}>🎙️ Pronunciation Tip:</Text>
                        <Text style={styles.fbBody}>{currentActivity.feedbackData.pronunciationTip}</Text>
                      </View>

                      <View style={styles.fbItemBox}>
                        <Text style={styles.fbHeader}>🚀 Specific Improvement Suggestion:</Text>
                        <Text style={styles.fbBody}>{currentActivity.feedbackData.improvementSuggestion}</Text>
                      </View>
                    </View>
                  </View>
                )}
              </ScrollView>

              {/* Next Step Footer */}
              <TouchableOpacity style={styles.nextCtaBtn} onPress={handleNextActivity}>
                <Text style={styles.nextCtaText}>
                  {activeActivityIndex < activeLesson.activities.length - 1
                    ? `Continue to Step ${activeActivityIndex + 2} ›`
                    : 'Complete Lesson (+30 XP) 🎉'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  screenTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  screenSub: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
    marginBottom: 14,
  },
  categoryScroll: {
    marginBottom: 14,
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.cardBg,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 6,
  },
  catIcon: {
    fontSize: 16,
  },
  catText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  catTextActive: {
    color: '#FFF',
    fontWeight: '900',
  },
  catHeaderCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    marginBottom: 16,
  },
  catHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  catHeaderIcon: {
    fontSize: 28,
  },
  catHeaderTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  catHeaderDesc: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  moduleCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  moduleTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  moduleDesc: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
    marginBottom: 12,
  },
  lessonItem: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  lessonLeft: {
    flex: 1,
    marginRight: 10,
  },
  timeTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  timeTagText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  lessonTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  lessonContext: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  startPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  startPillText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '92%',
    padding: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  modalLessonCategory: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  modalLessonTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  closeText: {
    color: colors.textMuted,
    fontSize: 22,
  },
  activityStepBar: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  actDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actDotCurrent: {
    backgroundColor: colors.primary,
  },
  actDotDone: {
    backgroundColor: colors.secondary,
  },
  actDotText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  actBodyScroll: {
    marginBottom: 16,
  },
  actTypeBadge: {
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  actTypeText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '900',
  },
  actTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  activityBox: {
    gap: 12,
  },
  phraseCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  phraseCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  phraseCardText: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 15,
  },
  phraseCardPhonetic: {
    color: colors.primary,
    fontSize: 11,
  },
  phraseCardMeaning: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
  },
  phraseCardEx: {
    color: colors.textMuted,
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 4,
  },
  dialogueBox: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  speakerName: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 12,
  },
  dialogueText: {
    color: colors.text,
    fontSize: 14,
    marginTop: 2,
  },
  quizBox: {
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  quizQuestion: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
  },
  quizOptBtn: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  quizOptText: {
    color: '#FFF',
    fontSize: 13,
  },
  checkAnsBtn: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  checkAnsText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 13,
  },
  expText: {
    color: colors.success,
    fontSize: 12,
    marginTop: 8,
  },
  speakCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  speakSituation: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 6,
  },
  speakTargetText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  speakAudioRow: {
    flexDirection: 'row',
    gap: 8,
  },
  recBtn: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  recActiveBtn: {
    backgroundColor: colors.danger,
  },
  recBtnText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 15,
  },
  feedbackCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  fbScoreVal: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '900',
  },
  fbScoreLbl: {
    color: colors.textSecondary,
    fontSize: 11,
    marginBottom: 14,
  },
  fbItemBox: {
    width: '100%',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  fbHeader: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 4,
  },
  fbBody: {
    color: colors.text,
    fontSize: 13,
  },
  fbBodyAlt: {
    color: colors.secondary,
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 6,
  },
  nextCtaBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  nextCtaText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 15,
  },
});
