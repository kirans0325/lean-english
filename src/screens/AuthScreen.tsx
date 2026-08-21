import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { colors } from '../theme/colors';
import { useAuth } from '../context/AuthContext';
import { LearningPhase } from '../types';

export const AuthScreen: React.FC = () => {
  const { login, register } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<LearningPhase>('basics');

  const handleSubmit = async () => {
    if (!email) return;
    if (isRegistering) {
      await register(name || 'English Learner', email, selectedPhase);
    } else {
      await login(email, name);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.logoTitle}>FluentAI English</Text>
        <Text style={styles.subtitle}>
          Master English with Movies, News, Daily Roleplays & Real-Time Pronunciation Check
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, !isRegistering && styles.activeTab]}
            onPress={() => setIsRegistering(false)}
          >
            <Text style={[styles.tabText, !isRegistering && styles.activeTabText]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, isRegistering && styles.activeTab]}
            onPress={() => setIsRegistering(true)}
          >
            <Text style={[styles.tabText, isRegistering && styles.activeTabText]}>Register</Text>
          </TouchableOpacity>
        </View>

        {isRegistering && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Alex Morgan"
              placeholderTextColor={colors.textMuted}
              value={name}
              onChangeText={setName}
            />
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="user@example.com"
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {isRegistering && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Starting Level</Text>
            <View style={styles.phaseSelector}>
              {(['basics', 'intermediate', 'advanced', 'business'] as LearningPhase[]).map((phase) => (
                <TouchableOpacity
                  key={phase}
                  style={[
                    styles.phaseChip,
                    selectedPhase === phase && styles.activePhaseChip,
                  ]}
                  onPress={() => setSelectedPhase(phase)}
                >
                  <Text
                    style={[
                      styles.phaseChipText,
                      selectedPhase === phase && styles.activePhaseChipText,
                    ]}
                  >
                    {phase.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {isRegistering ? 'Create Account & Start Learning' : 'Log In to App'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 20,
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoTitle: {
    color: colors.primary,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
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
    fontWeight: '700',
    fontSize: 14,
  },
  activeTabText: {
    color: '#FFF',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  phaseSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  phaseChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  activePhaseChip: {
    backgroundColor: colors.primaryDark,
    borderColor: colors.primary,
  },
  phaseChipText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
  },
  activePhaseChipText: {
    color: '#FFF',
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 16,
  },
});
