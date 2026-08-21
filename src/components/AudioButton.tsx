import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SpeechEngine, VoiceGender } from '../services/speech';
import { colors } from '../theme/colors';

interface AudioButtonProps {
  text: string;
  size?: 'small' | 'medium' | 'large';
  slowMode?: boolean;
  gender?: VoiceGender;
  labelOverride?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  size = 'medium',
  slowMode = false,
  gender = 'neutral',
  labelOverride,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    SpeechEngine.speak(text, {
      gender,
      slowMode,
      onDone: () => setIsPlaying(false),
    });
  };

  const getPadding = () => {
    switch (size) {
      case 'small': return { paddingHorizontal: 8, paddingVertical: 4 };
      case 'large': return { paddingHorizontal: 16, paddingVertical: 10 };
      default: return { paddingHorizontal: 12, paddingVertical: 6 };
    }
  };

  const getGenderIcon = () => {
    if (isPlaying) return '🔊';
    if (gender === 'female') return '👩‍💼';
    if (gender === 'male') return '👨‍💼';
    return '📢';
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getPadding(),
        gender === 'female' && styles.femaleButton,
        gender === 'male' && styles.maleButton,
        isPlaying && styles.playingButton,
      ]}
      onPress={handlePlay}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>{getGenderIcon()}</Text>
      <Text style={styles.label}>
        {labelOverride || (isPlaying ? 'Playing...' : slowMode ? 'Listen Slow' : 'Listen Voice')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
    borderRadius: 20,
  },
  femaleButton: {
    backgroundColor: '#EC4899', // Pink / Female Lady Voice accent
  },
  maleButton: {
    backgroundColor: '#3B82F6', // Blue / Male Voice accent
  },
  playingButton: {
    backgroundColor: colors.secondary,
  },
  icon: {
    fontSize: 14,
    marginRight: 6,
  },
  label: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
