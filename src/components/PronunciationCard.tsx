import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PronunciationEvaluation } from '../types';
import { colors } from '../theme/colors';

interface PronunciationCardProps {
  evaluation: PronunciationEvaluation;
}

export const PronunciationCard: React.FC<PronunciationCardProps> = ({ evaluation }) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return colors.success;
    if (score >= 60) return colors.warning;
    return colors.danger;
  };

  const getWordColor = (status: 'green' | 'yellow' | 'red') => {
    switch (status) {
      case 'green': return colors.success;
      case 'yellow': return colors.warning;
      case 'red': return colors.danger;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.cardTitle}>Pronunciation Feedback</Text>
        <View style={[styles.scoreBadge, { backgroundColor: getScoreColor(evaluation.accuracyScore) }]}>
          <Text style={styles.scoreText}>{evaluation.accuracyScore}%</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>Word Breakdown:</Text>
      <View style={styles.wordContainer}>
        {evaluation.wordFeedback.map((item, idx) => (
          <View key={idx} style={[styles.wordPill, { borderColor: getWordColor(item.status) }]}>
            <Text style={[styles.wordText, { color: getWordColor(item.status) }]}>
              {item.word}
            </Text>
            <Text style={styles.wordScore}>{item.score}%</Text>
          </View>
        ))}
      </View>

      <View style={styles.transcriptionBox}>
        <Text style={styles.transcriptionLabel}>Transcribed Speech:</Text>
        <Text style={styles.transcriptionText}>
          "{evaluation.spokenText || 'No speech detected. Please speak into the mic.'}"
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginVertical: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  scoreText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 14,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  wordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  wordPill: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  wordText: {
    fontWeight: '800',
    fontSize: 14,
  },
  wordScore: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  transcriptionBox: {
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 10,
  },
  transcriptionLabel: {
    color: colors.textMuted,
    fontSize: 11,
    marginBottom: 4,
  },
  transcriptionText: {
    color: colors.text,
    fontSize: 13,
    fontStyle: 'italic',
  },
});
