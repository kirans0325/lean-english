import * as Speech from 'expo-speech';
import { Platform } from 'react-native';

export type VoiceGender = 'female' | 'male' | 'neutral';
export type VoiceAccent = 'en-IN' | 'en-US' | 'en-GB';

export class SpeechEngine {
  private static preferredAccent: VoiceAccent = 'en-IN';

  static setAccent(accent: VoiceAccent) {
    this.preferredAccent = accent;
  }

  static getAccent(): VoiceAccent {
    return this.preferredAccent;
  }

  /**
   * Premium Speech Synthesis with strict Male vs Lady voice separation and distinct pitch modulation
   */
  static speak(
    text: string,
    options?: {
      gender?: VoiceGender;
      accent?: VoiceAccent;
      slowMode?: boolean;
      onDone?: () => void;
    }
  ) {
    try {
      Speech.stop();

      const gender = options?.gender || 'neutral';
      const accent = options?.accent || this.preferredAccent;
      const slowMode = options?.slowMode || false;
      const rate = slowMode ? 0.70 : 0.92;

      // Unmistakably distinct Pitch Modulation:
      // Female: 1.32 (High, Feminine Pitch)
      // Male: 0.76 (Deep, Masculine Pitch)
      // Neutral: 1.0
      let pitch = 1.0;
      if (gender === 'female') {
        pitch = 1.32;
      } else if (gender === 'male') {
        pitch = 0.76;
      }

      if (Platform.OS === 'web' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();

        const formattedText = text
          .replace(/([.,!?])/g, '$1 ')
          .replace(/\s+/g, ' ');

        const utterance = new SpeechSynthesisUtterance(formattedText);
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = 1.0;
        utterance.lang = accent;

        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          let selectedVoice: SpeechSynthesisVoice | undefined;

          const femaleKeywords = ['female', 'heera', 'neerja', 'veena', 'zira', 'samantha', 'victoria', 'karen', 'hazel', 'aria', 'jenny', 'woman'];
          const maleKeywords = ['male', 'ravi', 'prabhat', 'rishi', 'david', 'alex', 'george', 'daniel', 'mark', 'guy', 'james', 'man'];

          if (gender === 'female') {
            // Match female voice in preferred accent
            selectedVoice = voices.find(
              (v) =>
                (v.lang.includes('IN') || v.lang.startsWith('en-IN') || v.name.includes('India')) &&
                femaleKeywords.some((kw) => v.name.toLowerCase().includes(kw))
            );

            // Fallback to any general female English voice
            if (!selectedVoice) {
              selectedVoice = voices.find(
                (v) => v.lang.startsWith('en') && femaleKeywords.some((kw) => v.name.toLowerCase().includes(kw))
              );
            }
          } else if (gender === 'male') {
            // Match male voice in preferred accent
            selectedVoice = voices.find(
              (v) =>
                (v.lang.includes('IN') || v.lang.startsWith('en-IN') || v.name.includes('India')) &&
                maleKeywords.some((kw) => v.name.toLowerCase().includes(kw))
            );

            // Fallback to any general male English voice
            if (!selectedVoice) {
              selectedVoice = voices.find(
                (v) => v.lang.startsWith('en') && maleKeywords.some((kw) => v.name.toLowerCase().includes(kw))
              );
            }
          }

          // Accent fallback if no specific gender keyword matched
          if (!selectedVoice && accent === 'en-IN') {
            selectedVoice = voices.find(
              (v) => v.lang.includes('IN') || v.lang.startsWith('en-IN') || v.name.includes('India')
            );
          }

          if (!selectedVoice) {
            selectedVoice = voices.find((v) => v.lang.startsWith('en'));
          }

          if (selectedVoice) {
            utterance.voice = selectedVoice;
          }
        }

        utterance.onend = () => {
          if (options?.onDone) options.onDone();
        };

        utterance.onerror = () => {
          if (options?.onDone) options.onDone();
        };

        window.speechSynthesis.speak(utterance);
        return;
      }

      // Native Expo Speech fallback
      Speech.speak(text, {
        language: accent,
        pitch,
        rate,
        onDone: () => {
          if (options?.onDone) options.onDone();
        },
        onError: () => {
          if (options?.onDone) options.onDone();
        },
      });
    } catch (error) {
      console.warn('Speech synthesis error:', error);
      if (options?.onDone) options.onDone();
    }
  }

  /**
   * Stop speech
   */
  static stop() {
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      Speech.stop();
    } catch (e) {}
  }

  /**
   * Web Speech Recognition API
   */
  static startListening(
    onResult: (text: string, isFinal: boolean) => void,
    onError: (err: string) => void
  ): { stop: () => void } {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-IN';

        recognition.onresult = (event: any) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          const isFinal = event.results[event.results.length - 1].isFinal;
          onResult(transcript, isFinal);
        };

        recognition.onerror = (event: any) => {
          onError(event.error || 'Speech recognition error');
        };

        recognition.start();

        return {
          stop: () => {
            try {
              recognition.stop();
            } catch (e) {}
          },
        };
      }
    }

    let timer: any;
    return {
      stop: () => {
        if (timer) clearTimeout(timer);
      },
    };
  }
}
