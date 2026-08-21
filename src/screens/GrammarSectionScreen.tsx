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
import { englishGrammarRulesData, GrammarRuleTopic } from '../data/grammarRules';
import { AudioButton } from '../components/AudioButton';

export const GrammarSectionScreen: React.FC = () => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Sentence Structure', 'Workplace Diplomacy', 'Tenses', 'Prepositions', 'Common Traps'];

  const filteredRules = englishGrammarRulesData.filter((rule) => {
    const matchesCategory =
      activeCategoryFilter === 'All' || rule.category === activeCategoryFilter;

    const matchesSearch =
      !searchQuery.trim() ||
      rule.ruleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📘 English Grammar & Sentence Rules</Text>
      <Text style={styles.subtitle}>
        Master essential word order, diplomatic softening formulas, tenses, and spoken grammar traps.
      </Text>

      {/* Category Filter Tabs */}
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

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Search grammar rules (e.g. tenses, prepositions, word order)..."
        placeholderTextColor={colors.textMuted}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Rules List Cards */}
      {filteredRules.map((rule) => (
        <View key={rule.id} style={styles.ruleCard}>
          <View style={styles.ruleHeader}>
            <View style={styles.catBadge}>
              <Text style={styles.catBadgeText}>{rule.category.toUpperCase()}</Text>
            </View>
            <Text style={styles.ruleTitle}>{rule.ruleTitle}</Text>
          </View>

          {/* Formula Box */}
          <View style={styles.formulaBox}>
            <Text style={styles.formulaLabel}>⚙️ RULE FORMULA:</Text>
            <Text style={styles.formulaText}>{rule.formula}</Text>
          </View>

          {/* Explanation */}
          <Text style={styles.explanationText}>{rule.explanation}</Text>

          {/* Pro Spoken Fluency Tip */}
          <View style={styles.tipBox}>
            <Text style={styles.tipTitle}>💡 Pro Spoken Fluency Tip:</Text>
            <Text style={styles.tipText}>{rule.proFluencyTip}</Text>
          </View>

          {/* Examples Comparison */}
          <Text style={styles.examplesHeaderTitle}>Real-Life Examples:</Text>
          {rule.examples.map((ex, idx) => (
            <View key={idx} style={styles.exampleItem}>
              {/* Correct */}
              <View style={styles.correctBox}>
                <View style={styles.exTopRow}>
                  <Text style={styles.correctBadgeText}>✅ Correct Spoken English:</Text>
                  <AudioButton text={ex.correct} size="small" />
                </View>
                <Text style={styles.correctText}>"{ex.correct}"</Text>
              </View>

              {/* Incorrect */}
              <View style={styles.incorrectBox}>
                <Text style={styles.incorrectBadgeText}>❌ Common Learner Mistake:</Text>
                <Text style={styles.incorrectText}>"{ex.incorrect}"</Text>
              </View>

              <Text style={styles.reasonText}>Why: {ex.explanation}</Text>
            </View>
          ))}
        </View>
      ))}
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
  filterScroll: {
    marginBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.cardBg,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  activeFilterChipText: {
    color: '#FFF',
    fontWeight: '900',
  },
  searchInput: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 12,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: 16,
  },
  ruleCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  ruleHeader: {
    marginBottom: 10,
  },
  catBadge: {
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  catBadgeText: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '900',
  },
  ruleTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  formulaBox: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.primaryDark,
  },
  formulaLabel: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '900',
    marginBottom: 4,
  },
  formulaText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  explanationText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  tipBox: {
    backgroundColor: '#1E1B4B',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  tipTitle: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 2,
  },
  tipText: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 16,
  },
  examplesHeaderTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
  },
  exampleItem: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  correctBox: {
    marginBottom: 8,
  },
  exTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  correctBadgeText: {
    color: colors.secondary,
    fontSize: 11,
    fontWeight: '800',
  },
  correctText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  incorrectBox: {
    marginBottom: 6,
  },
  incorrectBadgeText: {
    color: colors.danger,
    fontSize: 11,
    fontWeight: '800',
  },
  incorrectText: {
    color: colors.textMuted,
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  reasonText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 4,
  },
});
