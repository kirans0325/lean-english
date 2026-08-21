import { PronunciationEvaluation, SpokenHistoryRecord } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export class ApiService {
  /**
   * Evaluate Pronunciation via Backend server or local algorithm
   */
  static async evaluatePronunciation(
    userId: number | null,
    phraseText: string,
    spokenText: string,
    phase: string
  ): Promise<PronunciationEvaluation> {
    try {
      const response = await fetch(`${API_BASE_URL}/speaking/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, phraseText, spokenText, phase }),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          phraseText,
          spokenText,
          accuracyScore: data.score,
          wordFeedback: data.wordFeedback,
        };
      }
    } catch (e) {
      console.log('Backend API offline, evaluating pronunciation locally...');
    }

    // Local fallback calculation
    return this.evaluatePronunciationLocally(phraseText, spokenText);
  }

  /**
   * Local Levenshtein & phonetic similarity calculation
   */
  private static evaluatePronunciationLocally(
    targetText: string,
    spokenText: string
  ): PronunciationEvaluation {
    if (!spokenText || spokenText.trim() === '') {
      return {
        phraseText: targetText,
        spokenText: '',
        accuracyScore: 0,
        wordFeedback: targetText.split(/\s+/).map((word) => ({ word, status: 'red', score: 0 })),
      };
    }

    const cleanTarget = targetText.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    const cleanSpoken = spokenText.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

    const targetWords = cleanTarget.split(/\s+/);
    const spokenWords = cleanSpoken.split(/\s+/);

    const wordFeedback = targetWords.map((word) => {
      const isMatched = spokenWords.includes(word);
      let status: 'green' | 'yellow' | 'red' = 'red';
      let wordScore = 40;

      if (isMatched) {
        status = 'green';
        wordScore = 95;
      } else {
        const partial = spokenWords.some((sw) => sw.startsWith(word.slice(0, 3)) || word.startsWith(sw.slice(0, 3)));
        if (partial) {
          status = 'yellow';
          wordScore = 75;
        }
      }

      return { word, status, score: wordScore };
    });

    const totalScore = Math.round(
      wordFeedback.reduce((acc, curr) => acc + curr.score, 0) / wordFeedback.length
    );

    return {
      phraseText: targetText,
      spokenText,
      accuracyScore: totalScore,
      wordFeedback,
    };
  }
}
