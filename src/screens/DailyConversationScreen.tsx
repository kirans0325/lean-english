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
import { aiRoleplayScenarios, AIRoleplayScenario } from '../data/conversations';
import { AudioButton } from '../components/AudioButton';
import { SpeechEngine } from '../services/speech';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

export const DailyConversationScreen: React.FC = () => {
  const { user } = useAuth();
  const { addXP } = useProgress();

  const [selectedScenario, setSelectedScenario] = useState<AIRoleplayScenario>(aiRoleplayScenarios[0]);
  const [isSimulatorActive, setIsSimulatorActive] = useState<boolean>(false);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [userSpokenText, setUserSpokenText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);

  const scenario = selectedScenario;
  const turns = scenario.turns;
  const activeTurn = turns[currentTurnIndex];

  const handleStartSimulator = () => {
    setIsSimulatorActive(true);
    setCurrentTurnIndex(0);
    setShowReport(false);
    setUserSpokenText('');

    // Trigger AI first line audio
    if (turns[0] && turns[0].speaker === 'partner') {
      SpeechEngine.speak(turns[0].audioText, { gender: scenario.partnerGender });
    }
  };

  const handleNextTurn = (response?: string) => {
    const textToSend = response || activeTurn?.text || 'I understand, let us proceed.';
    setUserSpokenText(textToSend);

    if (currentTurnIndex < turns.length - 1) {
      const nextIndex = currentTurnIndex + 1;
      setCurrentTurnIndex(nextIndex);

      // Speak next AI turn automatically
      const nextTurn = turns[nextIndex];
      if (nextTurn && nextTurn.speaker === 'partner') {
        SpeechEngine.speak(nextTurn.audioText, { gender: scenario.partnerGender });
      }
    } else {
      // Completed conversation! Show Post-Roleplay Report
      addXP(50);
      setShowReport(true);
    }
  };

  const startVoiceRecording = () => {
    setIsListening(true);
    SpeechEngine.startListening(
      (text) => {
        setUserSpokenText(text);
        setIsListening(false);
        handleNextTurn(text);
      },
      (err) => {
        setIsListening(false);
        handleNextTurn();
      }
    );
  };

  const report = scenario.sampleReport;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Scenario Selector Header Bar */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
        {aiRoleplayScenarios.map((item) => {
          const isSelected = selectedScenario.id === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.scenarioChip, isSelected && styles.activeScenarioChip]}
              onPress={() => {
                setSelectedScenario(item);
                setIsSimulatorActive(false);
                setShowReport(false);
              }}
            >
              <Text style={styles.scenarioChipTag}>{item.difficulty.toUpperCase()}</Text>
              <Text style={styles.scenarioChipTitle} numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* VIEW 1: SCENARIO PREVIEW & USEFUL PHRASES (Before starting) */}
      {!isSimulatorActive && !showReport && (
        <View style={styles.previewContainer}>
          {/* Main Scenario Setup Card */}
          <View style={styles.scenarioCard}>
            <View style={styles.cardHeaderRow}>
              <Image source={{ uri: scenario.avatarUrl }} style={styles.partnerAvatar} />
              <View style={{ flex: 1 }}>
                <View style={styles.diffBadge}>
                  <Text style={styles.diffBadgeText}>{scenario.difficulty.toUpperCase()} DIFFICULTY</Text>
                </View>
                <Text style={styles.scenarioTitle}>{scenario.title}</Text>
              </View>
            </View>

            <Text style={styles.scenarioDesc}>{scenario.scenario}</Text>

            {/* Metadata Table */}
            <View style={styles.metaTable}>
              <View style={styles.metaRow}>
                <Text style={styles.metaKey}>YOUR ROLE:</Text>
                <Text style={styles.metaVal}>{scenario.userRole}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaKey}>AI ROLE:</Text>
                <Text style={styles.metaVal}>{scenario.aiRole}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaKey}>ESTIMATED TIME:</Text>
                <Text style={styles.metaVal}>⏱️ {scenario.estimatedTimeMins} minutes</Text>
              </View>
            </View>

            {/* Skills Badges */}
            <Text style={styles.skillsHeading}>Target Skills Improving:</Text>
            <View style={styles.skillsRow}>
              {scenario.skills.map((s, idx) => (
                <View key={idx} style={styles.skillPill}>
                  <Text style={styles.skillPillText}>{s}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Useful Phrases Warm-Up Section */}
          <View style={styles.phrasesCard}>
            <Text style={styles.phrasesHeaderTitle}>💡 Useful Phrases You May Need:</Text>
            <Text style={styles.phrasesHeaderSub}>Listen and practice these phrases before launching the simulator.</Text>

            {scenario.usefulPhrases.map((item, idx) => (
              <View key={idx} style={styles.phraseItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.phraseText}>"{item.phrase}"</Text>
                  <Text style={styles.phraseExp}>{item.explanation}</Text>
                </View>
                <AudioButton text={item.phrase} size="small" />
              </View>
            ))}
          </View>

          {/* Launch CTA */}
          <TouchableOpacity style={styles.startSimulatorBtn} onPress={handleStartSimulator}>
            <Text style={styles.startSimulatorBtnText}>Start AI Conversation Simulator ›</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* VIEW 2: INTERACTIVE TURN-BY-TURN SIMULATOR */}
      {isSimulatorActive && !showReport && (
        <View style={styles.simulatorContainer}>
          {/* Partner Banner */}
          <View style={styles.partnerBanner}>
            <Image source={{ uri: scenario.avatarUrl }} style={styles.partnerAvatarSmall} />
            <View style={{ flex: 1 }}>
              <Text style={styles.partnerNameText}>{scenario.partnerName}</Text>
              <Text style={styles.partnerRoleText}>{scenario.aiRole} • {scenario.difficulty}</Text>
            </View>
            <TouchableOpacity onPress={() => setIsSimulatorActive(false)}>
              <Text style={styles.exitText}>Exit</Text>
            </TouchableOpacity>
          </View>

          {/* Chat Thread */}
          <View style={styles.chatThread}>
            {turns.slice(0, currentTurnIndex + 1).map((turn) => {
              const isPartner = turn.speaker === 'partner';
              return (
                <View
                  key={turn.id}
                  style={[
                    styles.bubbleRow,
                    isPartner ? styles.partnerBubbleRow : styles.userBubbleRow,
                  ]}
                >
                  <View
                    style={[
                      styles.bubble,
                      isPartner ? styles.partnerBubble : styles.userBubble,
                    ]}
                  >
                    <Text style={styles.speakerTag}>{isPartner ? scenario.partnerName : user?.name || 'You'}</Text>
                    <Text style={styles.bubbleText}>{turn.text}</Text>
                    <View style={{ marginTop: 6 }}>
                      <AudioButton
                        text={turn.audioText}
                        gender={isPartner ? scenario.partnerGender : 'female'}
                        size="small"
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Speaker Controls */}
          {activeTurn && (
            <View style={styles.speakerFooter}>
              {activeTurn.speaker === 'user' ? (
                <View>
                  <Text style={styles.yourTurnHeading}>Your Turn to Speak ({scenario.userRole}):</Text>

                  {/* Suggested Response Options */}
                  {activeTurn.hintOptions && (
                    <View style={styles.hintsRow}>
                      {activeTurn.hintOptions.map((opt, hIdx) => (
                        <TouchableOpacity
                          key={hIdx}
                          style={styles.hintChip}
                          onPress={() => handleNextTurn(opt)}
                        >
                          <Text style={styles.hintChipText}>💬 "{opt}"</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  <View style={styles.actionBtnRow}>
                    <TouchableOpacity
                      style={[styles.micBtn, isListening && styles.micActiveBtn]}
                      onPress={startVoiceRecording}
                    >
                      <Text style={styles.micBtnText}>{isListening ? '🎙️ Listening...' : '🎤 Speak Your Response'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.autoBtn} onPress={() => handleNextTurn()}>
                      <Text style={styles.autoBtnText}>Send Auto</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity style={styles.continueBtn} onPress={() => handleNextTurn()}>
                  <Text style={styles.continueBtnText}>Continue Conversation ›</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      )}

      {/* VIEW 3: POST-ROLEPLAY CONVERSATION REPORT */}
      {showReport && (
        <View style={styles.reportContainer}>
          <Text style={styles.reportHeaderTitle}>📊 Post-Roleplay Conversation Report</Text>
          <Text style={styles.reportHeaderSub}>AI analysis of your spoken fluency, grammar, and pronunciation.</Text>

          {/* Score Summary Box */}
          <View style={styles.scoreSummaryBox}>
            <View style={styles.overallRing}>
              <Text style={styles.overallScoreText}>{report.overallScore}</Text>
              <Text style={styles.overallMaxText}>/ 100</Text>
            </View>

            <View style={styles.subScoresGrid}>
              <View style={styles.subScoreItem}>
                <Text style={styles.subVal}>{report.subScores.fluency}%</Text>
                <Text style={styles.subLbl}>Fluency</Text>
              </View>
              <View style={styles.subScoreItem}>
                <Text style={styles.subVal}>{report.subScores.pronunciation}%</Text>
                <Text style={styles.subLbl}>Pronunciation</Text>
              </View>
              <View style={styles.subScoreItem}>
                <Text style={styles.subVal}>{report.subScores.grammar}%</Text>
                <Text style={styles.subLbl}>Grammar</Text>
              </View>
              <View style={styles.subScoreItem}>
                <Text style={styles.subVal}>{report.subScores.vocabulary}%</Text>
                <Text style={styles.subLbl}>Vocabulary</Text>
              </View>
            </View>
          </View>

          {/* 1. What You Did Well */}
          <View style={styles.reportCard}>
            <Text style={styles.reportCardHeading}>✅ 1. What You Did Well</Text>
            {report.whatYouDidWell.map((item, idx) => (
              <View key={idx} style={styles.checkRow}>
                <Text style={styles.greenCheck}>✓</Text>
                <Text style={styles.reportBodyText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* 2. Grammar Corrections */}
          {report.grammarCorrections && report.grammarCorrections.length > 0 && (
            <View style={styles.reportCard}>
              <Text style={styles.reportCardHeading}>✍️ 2. Grammar Corrections</Text>
              {report.grammarCorrections.map((g, idx) => (
                <View key={idx} style={styles.gramBox}>
                  <Text style={styles.gramMistake}>❌ Spoken: "{g.mistake}"</Text>
                  <Text style={styles.gramCorrection}>✅ Correction: "{g.correction}"</Text>
                  <Text style={styles.gramReason}>Reason: {g.reason}</Text>
                </View>
              ))}
            </View>
          )}

          {/* 3. Better Natural Phrases */}
          {report.betterNaturalPhrases && (
            <View style={styles.reportCard}>
              <Text style={styles.reportCardHeading}>💡 3. Better Natural Phrases (Native Phrasing)</Text>
              {report.betterNaturalPhrases.map((np, idx) => (
                <View key={idx} style={styles.natRow}>
                  <Text style={styles.natSpoken}>Spoken: "{np.spoken}"</Text>
                  <Text style={styles.natBetter}>Native Alternative: "{np.natural}"</Text>
                  <AudioButton text={np.natural} size="small" />
                </View>
              ))}
            </View>
          )}

          {/* 4. Pronunciation Issues */}
          {report.pronunciationIssues && (
            <View style={styles.reportCard}>
              <Text style={styles.reportCardHeading}>🎙️ 4. Words with Pronunciation Issues</Text>
              <View style={styles.pronPillGrid}>
                {report.pronunciationIssues.map((p, idx) => (
                  <View key={idx} style={styles.pronItemBox}>
                    <Text style={styles.pronWord}>{p.word}</Text>
                    <Text style={styles.pronScore}>{p.score}%</Text>
                    <Text style={styles.pronTip}>{p.tip}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* 5. Recommended Next Practice */}
          <View style={styles.nextPracticeBox}>
            <Text style={styles.nextPracticeHeader}>🚀 5. Recommended Next Practice:</Text>
            <Text style={styles.nextPracticeBody}>{report.recommendedNextPractice}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.reportActionRow}>
            <TouchableOpacity style={styles.actionBtnSecondary} onPress={handleStartSimulator}>
              <Text style={styles.actionBtnSecondaryText}>🔄 Practice Again</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtnPrimary} onPress={() => setIsSimulatorActive(false)}>
              <Text style={styles.actionBtnPrimaryText}>🚀 Try Harder Scenario</Text>
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
  carousel: {
    marginBottom: 16,
  },
  scenarioChip: {
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 10,
    marginRight: 10,
    width: 220,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  activeScenarioChip: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  scenarioChipTag: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '900',
  },
  scenarioChipTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },
  previewContainer: {
    gap: 16,
  },
  scenarioCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  partnerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  diffBadge: {
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  diffBadgeText: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '900',
  },
  scenarioTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  scenarioDesc: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  metaTable: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    gap: 6,
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaKey: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
  },
  metaVal: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  skillsHeading: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 6,
  },
  skillsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  skillPill: {
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  skillPillText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '700',
  },
  phrasesCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  phrasesHeaderTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  phrasesHeaderSub: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
    marginBottom: 12,
  },
  phraseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  phraseText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  phraseExp: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  startSimulatorBtn: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  startSimulatorBtnText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 16,
  },

  // Simulator View
  simulatorContainer: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  partnerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  partnerAvatarSmall: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  partnerNameText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  partnerRoleText: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  exitText: {
    color: colors.danger,
    fontWeight: '800',
    fontSize: 12,
  },
  chatThread: {
    gap: 12,
    marginBottom: 16,
  },
  bubbleRow: {
    flexDirection: 'row',
  },
  partnerBubbleRow: {
    justifyContent: 'flex-start',
  },
  userBubbleRow: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '85%',
    borderRadius: 16,
    padding: 12,
  },
  partnerBubble: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  userBubble: {
    backgroundColor: colors.primaryDark,
  },
  speakerTag: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 4,
  },
  bubbleText: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
  },
  speakerFooter: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 12,
  },
  yourTurnHeading: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 8,
  },
  hintsRow: {
    gap: 6,
    marginBottom: 10,
  },
  hintChip: {
    backgroundColor: colors.cardBg,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  hintChipText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  actionBtnRow: {
    flexDirection: 'row',
    gap: 8,
  },
  micBtn: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  micActiveBtn: {
    backgroundColor: colors.danger,
  },
  micBtnText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 13,
  },
  autoBtn: {
    backgroundColor: colors.cardBg,
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  autoBtnText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  continueBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueBtnText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 14,
  },

  // Report Modal / View
  reportContainer: {
    gap: 14,
  },
  reportHeaderTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  reportHeaderSub: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: -8,
  },
  scoreSummaryBox: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  overallRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0F172A',
    borderWidth: 3,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overallScoreText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  overallMaxText: {
    color: colors.textMuted,
    fontSize: 10,
  },
  subScoresGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subScoreItem: {
    width: '45%',
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
  },
  subVal: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: '800',
  },
  subLbl: {
    color: colors.textSecondary,
    fontSize: 10,
  },
  reportCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  reportCardHeading: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  greenCheck: {
    color: colors.secondary,
    fontWeight: '900',
  },
  reportBodyText: {
    color: colors.textSecondary,
    fontSize: 12,
    flex: 1,
  },
  gramBox: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  gramMistake: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '700',
  },
  gramCorrection: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  gramReason: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  natRow: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  natSpoken: {
    color: colors.textMuted,
    fontSize: 11,
  },
  natBetter: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
    marginBottom: 6,
  },
  pronPillGrid: {
    gap: 8,
  },
  pronItemBox: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 10,
  },
  pronWord: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  pronScore: {
    color: colors.warning,
    fontSize: 11,
    fontWeight: '800',
  },
  pronTip: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  nextPracticeBox: {
    backgroundColor: '#1E1B4B',
    borderRadius: 14,
    padding: 14,
  },
  nextPracticeHeader: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  nextPracticeBody: {
    color: colors.text,
    fontSize: 13,
    marginTop: 4,
  },
  reportActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    marginBottom: 30,
  },
  actionBtnSecondary: {
    flex: 1,
    backgroundColor: colors.cardBg,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  actionBtnSecondaryText: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 13,
  },
  actionBtnPrimary: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  actionBtnPrimaryText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 13,
  },
});
