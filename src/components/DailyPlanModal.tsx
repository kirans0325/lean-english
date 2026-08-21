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
import { todayDailyPlan, DailyPlanStepData } from '../data/dailyPlanData';
import { AudioButton } from './AudioButton';
import { SpeechEngine } from '../services/speech';
import { ApiService } from '../services/api';
import { PronunciationCard } from './PronunciationCard';
import { useProgress } from '../context/ProgressContext';
import { PronunciationEvaluation } from '../types';

interface DailyPlanModalProps {
  visible: boolean;
  onClose: () => void;
}

export const DailyPlanModal: React.FC<DailyPlanModalProps> = ({ visible, onClose }) => {
  const { addXP, addSpokenRecord } = useProgress();
  const [currentStep, setCurrentStep] = useState<number>(1); // Step 1 to 5
  const [selectedQuizAns, setSelectedQuizAns] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Speak Step state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [spokenText, setSpokenText] = useState<string>('');
  const [evaluation, setEvaluation] = useState<PronunciationEvaluation | null>(null);

  const plan = todayDailyPlan;

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Completed all 5 steps!
      addXP(50);
      onClose();
      setCurrentStep(1);
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setSpokenText('');
    setEvaluation(null);

    SpeechEngine.startListening(
      (text) => {
        setSpokenText(text);
      },
      (err) => {
        setIsRecording(false);
        evaluateSpeech(plan.speakTargetSentence, plan.speakTargetSentence);
      }
    );
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    evaluateSpeech(plan.speakTargetSentence, spokenText || plan.speakTargetSentence);
  };

  const evaluateSpeech = async (target: string, spoken: string) => {
    const result = await ApiService.evaluatePronunciation(
      1,
      target,
      spoken,
      'business'
    );
    setEvaluation(result);

    await addSpokenRecord({
      phraseText: target,
      userTranscription: spoken,
      accuracyScore: result.accuracyScore,
      phase: 'business',
      feedbackDetails: result.wordFeedback,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <Modal animationType="slide" visible={visible} transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Top Bar with Step Progress Indicator */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.coachLabel}>PERSONAL ENGLISH COACH</Text>
              <Text style={styles.planTitle}>Today's 10-Minute Learning Plan</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* 5-Step Visual Progress Tracker */}
          <View style={styles.stepsBar}>
            {[1, 2, 3, 4, 5].map((stepNum) => {
              const isCurrent = currentStep === stepNum;
              const isDone = currentStep > stepNum;
              return (
                <View key={stepNum} style={styles.stepItem}>
                  <View
                    style={[
                      styles.stepDot,
                      isCurrent && styles.stepDotCurrent,
                      isDone && styles.stepDotDone,
                    ]}
                  >
                    <Text style={styles.stepDotText}>
                      {isDone ? '✓' : stepNum}
                    </Text>
                  </View>
                  <Text style={[styles.stepLabel, isCurrent && styles.stepLabelCurrent]}>
                    {stepNum === 1 && 'Warm-up'}
                    {stepNum === 2 && 'Learn'}
                    {stepNum === 3 && 'Practice'}
                    {stepNum === 4 && 'Speak'}
                    {stepNum === 5 && 'Feedback'}
                  </Text>
                </View>
              );
            })}
          </View>

          <ScrollView style={styles.bodyScroll}>
            {/* STEP 1: WARM-UP */}
            {currentStep === 1 && (
              <View style={styles.stepContainer}>
                <View style={styles.stepTagBox}>
                  <Text style={styles.stepTagText}>STEP 1: WARM-UP (2 MINS)</Text>
                </View>
                <Text style={styles.stepHeading}>Review 3 Phrases Due for Revision</Text>
                <Text style={styles.stepSub}>Listen and recall these key communication phrases before today's lesson.</Text>

                {plan.warmUpPhrases.map((item) => (
                  <View key={item.id} style={styles.warmUpCard}>
                    <View style={styles.warmUpTop}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.warmUpPhrase}>{item.phrase}</Text>
                        <Text style={styles.warmUpPhonetic}>{item.phonetic}</Text>
                      </View>
                      <AudioButton text={item.phrase} size="small" />
                    </View>
                    <Text style={styles.warmUpTrans}>{item.translation}</Text>
                    <Text style={styles.warmUpExample}>Example: "{item.example}"</Text>
                  </View>
                ))}
              </View>
            )}

            {/* STEP 2: LEARN */}
            {currentStep === 2 && (
              <View style={styles.stepContainer}>
                <View style={styles.stepTagBox}>
                  <Text style={styles.stepTagText}>STEP 2: LEARN PATTERN (2 MINS)</Text>
                </View>
                <Text style={styles.stepHeading}>Communication Pattern of the Day</Text>
                <Text style={styles.patternName}>{plan.learnPattern.pattern}</Text>
                <Text style={styles.stepSub}>{plan.learnPattern.usageContext}</Text>

                <View style={styles.skillBox}>
                  <Text style={styles.skillBoxText}>💡 Target Skill: {plan.learnPattern.skillImproved}</Text>
                </View>

                <Text style={styles.sectionSubTitle}>Real-World Example Sentence Patterns:</Text>
                {plan.learnPattern.examples.map((ex, idx) => (
                  <View key={idx} style={styles.exampleCard}>
                    <Text style={styles.exampleText}>"{ex.text}"</Text>
                    <Text style={styles.exampleExp}>{ex.explanation}</Text>
                    <View style={{ marginTop: 8 }}>
                      <AudioButton
                        text={ex.text}
                        gender={ex.gender}
                        labelOverride={ex.gender === 'female' ? '👩 Listen Lady Voice' : '👨 Listen Male Voice'}
                      />
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* STEP 3: PRACTICE */}
            {currentStep === 3 && (
              <View style={styles.stepContainer}>
                <View style={styles.stepTagBox}>
                  <Text style={styles.stepTagText}>STEP 3: INTERACTIVE PRACTICE (2 MINS)</Text>
                </View>
                <Text style={styles.stepHeading}>Test Your Understanding</Text>

                {plan.practiceQuestions.map((q) => (
                  <View key={q.id} style={styles.quizBox}>
                    <Text style={styles.quizPrompt}>{q.prompt}</Text>
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedQuizAns === oIdx;
                      const isCorrect = q.correctIndex === oIdx;
                      let bg = '#0F172A';
                      if (quizSubmitted) {
                        if (isCorrect) bg = colors.success;
                        else if (isSelected) bg = colors.danger;
                      } else if (isSelected) {
                        bg = colors.primary;
                      }

                      return (
                        <TouchableOpacity
                          key={oIdx}
                          style={[styles.quizOptionBtn, { backgroundColor: bg }]}
                          onPress={() => setSelectedQuizAns(oIdx)}
                        >
                          <Text style={styles.quizOptionText}>{opt}</Text>
                        </TouchableOpacity>
                      );
                    })}

                    {!quizSubmitted ? (
                      <TouchableOpacity
                        style={styles.submitQuizBtn}
                        onPress={() => setQuizSubmitted(true)}
                      >
                        <Text style={styles.submitQuizText}>Check Answer</Text>
                      </TouchableOpacity>
                    ) : (
                      <Text style={styles.quizExpText}>{q.explanation}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* STEP 4: SPEAK */}
            {currentStep === 4 && (
              <View style={styles.stepContainer}>
                <View style={styles.stepTagBox}>
                  <Text style={styles.stepTagText}>STEP 4: AI ROLEPLAY SPEAKING (3 MINS)</Text>
                </View>
                <Text style={styles.stepHeading}>Speak Today's Communication Pattern</Text>
                <Text style={styles.stepSub}>Listen to native pronunciation and speak into the mic to receive immediate AI scoring.</Text>

                <View style={styles.speakCard}>
                  <Text style={styles.speakLabel}>TARGET SENTENCE</Text>
                  <Text style={styles.speakSentence}>"{plan.speakTargetSentence}"</Text>

                  <View style={styles.speakAudioRow}>
                    <AudioButton text={plan.speakTargetSentence} gender="female" labelOverride="👩 Lady Voice" />
                    <AudioButton text={plan.speakTargetSentence} gender="male" labelOverride="👨 Male Voice" />
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.recordBtn, isRecording && styles.recordingActiveBtn]}
                  onPress={isRecording ? handleStopRecording : handleStartRecording}
                >
                  <Text style={styles.recordBtnText}>
                    {isRecording ? '⏹️ Stop & Score Pronunciation' : '🎤 Speak Now'}
                  </Text>
                </TouchableOpacity>

                {evaluation && <PronunciationCard evaluation={evaluation} />}
              </View>
            )}

            {/* STEP 5: FEEDBACK */}
            {currentStep === 5 && (
              <View style={styles.stepContainer}>
                <View style={styles.stepTagBox}>
                  <Text style={styles.stepTagText}>STEP 5: COACH FEEDBACK REPORT (1 MIN)</Text>
                </View>
                <Text style={styles.stepHeading}>🎉 Today's Learning Session Complete!</Text>

                <View style={styles.scoresRow}>
                  <View style={styles.scoreCard}>
                    <Text style={styles.scoreVal}>{plan.coachFeedback.fluencyScore}%</Text>
                    <Text style={styles.scoreLbl}>Fluency Score</Text>
                  </View>
                  <View style={styles.scoreCard}>
                    <Text style={styles.scoreVal}>{plan.coachFeedback.pronunciationScore}%</Text>
                    <Text style={styles.scoreLbl}>Pronunciation</Text>
                  </View>
                </View>

                {/* Coach Feedback Insights */}
                <View style={styles.feedbackCard}>
                  <Text style={styles.fbHeader}>✍️ Grammar & Intonation Tip:</Text>
                  <Text style={styles.fbBody}>{plan.coachFeedback.grammarTip}</Text>

                  <Text style={[styles.fbHeader, { marginTop: 12 }]}>💡 Native Sentence Alternative:</Text>
                  <Text style={styles.fbBodyAlt}>{plan.coachFeedback.nativeAlternative}</Text>

                  <Text style={[styles.fbHeader, { marginTop: 12 }]}>🔄 Words to Review Tomorrow:</Text>
                  <View style={styles.wordsRow}>
                    {plan.coachFeedback.wordsToReview.map((w, idx) => (
                      <View key={idx} style={styles.wordPill}>
                        <Text style={styles.wordPillText}>{w}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Next Step Recommendation */}
                <View style={styles.nextStepBox}>
                  <Text style={styles.nextStepHeader}>🚀 Recommended Next Step:</Text>
                  <Text style={styles.nextStepText}>{plan.nextStepRecommendation}</Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Bottom Action CTA */}
          <TouchableOpacity style={styles.primaryCtaBtn} onPress={handleNextStep}>
            <Text style={styles.primaryCtaText}>
              {currentStep < 5 ? `Continue to Step ${currentStep + 1} ›` : 'Finish & Claim 50 XP 🎉'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  coachLabel: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  planTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  closeBtn: {
    padding: 4,
  },
  closeText: {
    color: colors.textMuted,
    fontSize: 22,
  },
  stepsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 10,
    marginBottom: 16,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  stepDotCurrent: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stepDotDone: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  stepDotText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
  },
  stepLabel: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 4,
    fontWeight: '700',
  },
  stepLabelCurrent: {
    color: colors.text,
  },
  bodyScroll: {
    marginBottom: 16,
  },
  stepContainer: {
    paddingBottom: 10,
  },
  stepTagBox: {
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  stepTagText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '900',
  },
  stepHeading: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  stepSub: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 14,
  },
  warmUpCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  warmUpTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  warmUpPhrase: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 15,
  },
  warmUpPhonetic: {
    color: colors.primary,
    fontSize: 11,
  },
  warmUpTrans: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
  },
  warmUpExample: {
    color: colors.textMuted,
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 4,
  },
  patternName: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  skillBox: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
  },
  skillBoxText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
  },
  sectionSubTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
  },
  exampleCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  exampleText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  exampleExp: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  quizBox: {
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  quizPrompt: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 12,
  },
  quizOptionBtn: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  quizOptionText: {
    color: '#FFF',
    fontSize: 13,
  },
  submitQuizBtn: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  submitQuizText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 13,
  },
  quizExpText: {
    color: colors.success,
    fontSize: 12,
    marginTop: 8,
  },
  speakCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  speakLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 6,
  },
  speakSentence: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },
  speakAudioRow: {
    flexDirection: 'row',
    gap: 10,
  },
  recordBtn: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 14,
  },
  recordingActiveBtn: {
    backgroundColor: colors.danger,
  },
  recordBtnText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 15,
  },
  scoresRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  scoreCard: {
    flex: 1,
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  scoreVal: {
    color: colors.primary,
    fontSize: 26,
    fontWeight: '900',
  },
  scoreLbl: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  feedbackCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  fbHeader: {
    color: colors.accent,
    fontSize: 12,
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
  },
  wordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  wordPill: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  wordPillText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '700',
  },
  nextStepBox: {
    backgroundColor: '#1E1B4B',
    borderRadius: 12,
    padding: 12,
  },
  nextStepHeader: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  nextStepText: {
    color: colors.text,
    fontSize: 13,
    marginTop: 2,
  },
  primaryCtaBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryCtaText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 15,
  },
});
