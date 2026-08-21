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
import { mediaResources } from '../data/mediaResources';
import { MediaResource } from '../types';
import { AudioButton } from '../components/AudioButton';

export const MediaHubScreen: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaResource>(mediaResources[0]);
  const [showOriginalNews, setShowOriginalNews] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Media Resources & News Hub</Text>
      <Text style={styles.screenSub}>
        Learn English with real cinematic movie scenes, short films & simplified news briefs.
      </Text>

      {/* Media Resource Selectors */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
        {mediaResources.map((item) => {
          const isSelected = selectedMedia.id === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.carouselCard, isSelected && styles.activeCarouselCard]}
              onPress={() => setSelectedMedia(item)}
            >
              <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
              <View style={styles.badgeRow}>
                <Text style={styles.typeBadge}>{item.type.toUpperCase()}</Text>
                <Text style={styles.durationBadge}>{item.duration}</Text>
              </View>
              <Text style={styles.mediaCardTitle} numberOfLines={2}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Active Resource Reader & Transcript Breakdown */}
      <View style={styles.detailCard}>
        <View style={styles.detailHeader}>
          <View>
            <Text style={styles.sourceText}>{selectedMedia.sourceName} • {selectedMedia.phase.toUpperCase()}</Text>
            <Text style={styles.detailTitle}>{selectedMedia.title}</Text>
          </View>
        </View>

        <Text style={styles.summaryText}>{selectedMedia.summary}</Text>

        {/* Simplified vs Original News Toggle */}
        {selectedMedia.type === 'news' && (
          <View style={styles.newsBox}>
            <View style={styles.newsToggleRow}>
              <TouchableOpacity
                style={[styles.toggleBtn, !showOriginalNews && styles.activeToggleBtn]}
                onPress={() => setShowOriginalNews(false)}
              >
                <Text style={styles.toggleText}>Simplified English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleBtn, showOriginalNews && styles.activeToggleBtn]}
                onPress={() => setShowOriginalNews(true)}
              >
                <Text style={styles.toggleText}>Original Article</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.articleText}>
              {showOriginalNews ? selectedMedia.originalText : selectedMedia.simplifiedText}
            </Text>

            <AudioButton
              text={showOriginalNews ? selectedMedia.originalText || '' : selectedMedia.simplifiedText || ''}
              size="medium"
            />
          </View>
        )}

        {/* Scene Dialogue Transcript */}
        {selectedMedia.transcript && selectedMedia.transcript.length > 0 && (
          <View style={styles.transcriptSection}>
            <Text style={styles.sectionHeading}>Scene Dialogue Transcript</Text>
            {selectedMedia.transcript.map((t, idx) => (
              <View key={idx} style={styles.transcriptRow}>
                <View style={styles.speakerRow}>
                  <Text style={styles.speakerName}>{t.speaker}</Text>
                  <Text style={styles.timestamp}>[{t.timestamp}]</Text>
                </View>
                <Text style={styles.dialogueText}>"{t.text}"</Text>
                <AudioButton text={t.text} size="small" />
              </View>
            ))}
          </View>
        )}

        {/* Key Vocabulary List */}
        <View style={styles.vocabSection}>
          <Text style={styles.sectionHeading}>Key Vocabulary from Scene</Text>
          {selectedMedia.keyVocabList.map((item, idx) => (
            <View key={idx} style={styles.vocabRow}>
              <View style={styles.vocabMain}>
                <Text style={styles.vocabWord}>{item.word}</Text>
                <Text style={styles.vocabDef}>{item.definition}</Text>
              </View>
              <AudioButton text={item.word} size="small" />
            </View>
          ))}
        </View>
      </View>
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
    marginBottom: 16,
  },
  carousel: {
    marginBottom: 20,
  },
  carouselCard: {
    width: 200,
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  activeCarouselCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  thumbnail: {
    width: '100%',
    height: 110,
    borderRadius: 10,
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  typeBadge: {
    color: colors.accent,
    fontSize: 9,
    fontWeight: '900',
  },
  durationBadge: {
    color: colors.textMuted,
    fontSize: 9,
  },
  mediaCardTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  detailCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  detailHeader: {
    marginBottom: 10,
  },
  sourceText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
  },
  detailTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 2,
  },
  summaryText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  newsBox: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  newsToggleRow: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    borderRadius: 8,
    padding: 2,
    marginBottom: 12,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeToggleBtn: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  articleText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  transcriptSection: {
    marginTop: 10,
    marginBottom: 16,
  },
  sectionHeading: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 12,
  },
  transcriptRow: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  speakerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  speakerName: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 12,
  },
  timestamp: {
    color: colors.textMuted,
    fontSize: 10,
  },
  dialogueText: {
    color: colors.text,
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  vocabSection: {
    marginTop: 6,
  },
  vocabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  vocabMain: {
    flex: 1,
    marginRight: 10,
  },
  vocabWord: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 14,
  },
  vocabDef: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
});
