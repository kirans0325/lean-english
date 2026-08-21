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
import { dailyConversations } from '../data/conversations';
import { DailyConversationScenario, ConversationTurn } from '../types';
import { AudioButton } from '../components/AudioButton';
import { SpeechEngine } from '../services/speech';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

export const DailyConversationScreen: React.FC = () => {
  const { user } = useAuth();
  const { addXP } = useProgress();
  const [selectedScenario, setSelectedScenario] = useState<DailyConversationScenario>(
    dailyConversations[0]
  );
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [userSpokenText, setUserSpokenText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const turns = selectedScenario.turns;
  const activeTurn = turns[currentTurnIndex];

  const handleNextTurn = (response?: string) => {
    setUserSpokenText(response || activeTurn.text);
    addXP(10);
    if (currentTurnIndex < turns.length - 1) {
      setCurrentTurnIndex((prev) => prev + 1);
      setShowHint(false);
    }
  };

  const startVoiceRecording = () => {
    setIsListening(true);
    SpeechEngine.startListening(
      (transcription) => {
        setUserSpokenText(transcription);
        setIsListening(false);
        handleNextTurn(transcription);
      },
      (err) => {
        setIsListening(false);
        // Fallback simulate voice answer if error/unsupported on platform
        handleNextTurn();
      }
    );
  };

  return (
    <View style={styles.container}>
      {/* Scenario Selector Header */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scenarioBar}>
        {dailyConversations.map((sc) => {
          const isSelected = selectedScenario.id === sc.id;
          return (
            <TouchableOpacity
              key={sc.id}
              style={[styles.chip, isSelected && styles.activeChip]}
              onPress={() => {
                setSelectedScenario(sc);
                setCurrentTurnIndex(0);
                setShowHint(false);
              }}
            >
              <Text style={[styles.chipText, isSelected && styles.activeChipText]}>
                {sc.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Partner Info Banner */}
      <View style={styles.partnerBanner}>
        <Image source={{ uri: selectedScenario.avatarUrl }} style={styles.partnerAvatar} />
        <View style={styles.partnerDetails}>
          <Text style={styles.partnerName}>{selectedScenario.partnerName}</Text>
          <Text style={styles.partnerRole}>{selectedScenario.partnerRole} • {selectedScenario.phase.toUpperCase()}</Text>
        </View>
      </View>

      {/* Chat Conversation Thread */}
      <ScrollView style={styles.chatThread}>
        {turns.slice(0, currentTurnIndex + 1).map((turn, idx) => {
          const isPartner = turn.speaker === 'partner';
          return (
            <View
              key={turn.id}
              style={[
                styles.bubbleContainer,
                isPartner ? styles.partnerBubbleContainer : styles.userBubbleContainer,
              ]}
            >
              <View
                style={[
                  styles.bubble,
                  isPartner ? styles.partnerBubble : styles.userBubble,
                ]}
              >
                <Text style={styles.speakerTag}>{isPartner ? selectedScenario.partnerName : user?.name || 'You'}</Text>
                <Text style={styles.bubbleText}>{turn.text}</Text>

                <View style={styles.bubbleActions}>
                  <AudioButton text={turn.audioText} size="small" />
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Active Turn Interactive Controls */}
      {currentTurnIndex < turns.length && (
        <View style={styles.controlsFooter}>
          {activeTurn.speaker === 'user' ? (
            <View>
              <Text style={styles.yourTurnHeading}>Your Turn to Speak:</Text>
              
              {/* Recommended Response Options */}
              {activeTurn.hintOptions && (
                <View style={styles.hintsContainer}>
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

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={[styles.micButton, isListening && styles.micActive]}
                  onPress={startVoiceRecording}
                >
                  <Text style={styles.micIcon}>{isListening ? '🎙️ Listening...' : '🎤 Speak Your Turn'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.skipButton}
                  onPress={() => handleNextTurn()}
                >
                  <Text style={styles.skipText}>Send Auto</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => setCurrentTurnIndex((prev) => Math.min(turns.length - 1, prev + 1))}
            >
              <Text style={styles.continueText}>Continue Conversation →</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scenarioBar: {
    backgroundColor: colors.cardBg,
    padding: 10,
    maxHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#0F172A',
    marginRight: 8,
  },
  activeChip: {
    backgroundColor: colors.primary,
  },
  chipText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  activeChipText: {
    color: '#FFF',
  },
  partnerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  partnerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  partnerDetails: {
    flex: 1,
  },
  partnerName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  partnerRole: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  chatThread: {
    flex: 1,
    padding: 16,
  },
  bubbleContainer: {
    marginBottom: 14,
    flexDirection: 'row',
  },
  partnerBubbleContainer: {
    justifyContent: 'flex-start',
  },
  userBubbleContainer: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '82%',
    borderRadius: 16,
    padding: 14,
  },
  partnerBubble: {
    backgroundColor: colors.cardBg,
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
    fontSize: 14,
    lineHeight: 20,
  },
  bubbleActions: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  controlsFooter: {
    backgroundColor: colors.cardBg,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  yourTurnHeading: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
  },
  hintsContainer: {
    gap: 6,
    marginBottom: 10,
  },
  hintChip: {
    backgroundColor: '#0F172A',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  hintChipText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  micButton: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  micActive: {
    backgroundColor: colors.danger,
  },
  micIcon: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 14,
  },
  skipButton: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  skipText: {
    color: colors.textMuted,
    fontWeight: '700',
    fontSize: 12,
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 15,
  },
});
