import { LearningPhase } from '../types';

export type PronunciationMode = 'Word' | 'Sentence' | 'Shadowing';

export interface DetailedPronunciationDrill {
  id: string;
  phrase: string;
  ipa: string;
  phoneticApproximation?: string;
  mode: PronunciationMode;
  phase: LearningPhase;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tips: string;
  syllableBreakdown: string[];
  topicTag: string;
}

export const detailedPronunciationDrills: DetailedPronunciationDrill[] = [
  // ================= 1. WORD PRACTICE MODE =================
  {
    id: 'w-1',
    phrase: 'Particularly',
    ipa: '/pərˈtɪkjələrli/',
    phoneticApproximation: '[par-tik-yoo-lar-ly]',
    mode: 'Word',
    phase: 'intermediate',
    difficulty: 'Hard',
    tips: 'Break the word into 5 smaller parts: par - tic - u - lar - ly. Keep the stress on the second syllable "tic".',
    syllableBreakdown: ['par', 'tic', 'u', 'lar', 'ly'],
    topicTag: 'Fluency'
  },
  {
    id: 'w-2',
    phrase: 'Schedule',
    ipa: '/ˈskedʒuːl/',
    phoneticApproximation: '[sked-yool]',
    mode: 'Word',
    phase: 'basics',
    difficulty: 'Medium',
    tips: 'In American/Indian English, pronounce as "sked-yool". In British English, "shed-yool".',
    syllableBreakdown: ['sked', 'jool'],
    topicTag: 'Workplace'
  },
  {
    id: 'w-3',
    phrase: 'Development',
    ipa: '/dɪˈveləpmənt/',
    phoneticApproximation: '[di-vel-op-ment]',
    mode: 'Word',
    phase: 'intermediate',
    difficulty: 'Medium',
    tips: 'Stress the second syllable "vel", not "de".',
    syllableBreakdown: ['di', 'vel', 'op', 'ment'],
    topicTag: 'Technology'
  },
  {
    id: 'w-4',
    phrase: 'Process',
    ipa: '/ˈprɑːses/',
    phoneticApproximation: '[prah-sess]',
    mode: 'Word',
    phase: 'basics',
    difficulty: 'Easy',
    tips: 'Keep the first vowel short: "praw-sess".',
    syllableBreakdown: ['pro', 'cess'],
    topicTag: 'Workplace'
  },
  {
    id: 'w-5',
    phrase: 'Quality',
    ipa: '/ˈkwɑːləti/',
    phoneticApproximation: '[kwah-li-tee]',
    mode: 'Word',
    phase: 'basics',
    difficulty: 'Easy',
    tips: 'Soft "t" sound between vowels in natural speech: "kwah-li-tee".',
    syllableBreakdown: ['qual', 'i', 'ty'],
    topicTag: 'Daily Life'
  },

  // ================= 2. SENTENCE PRACTICE MODE =================
  {
    id: 's-1',
    phrase: 'I would like to discuss the project timeline.',
    ipa: '/aɪ wʊd laɪk tuː dɪˈskʌs ðə ˈprɒdʒekt ˈtaɪmlaɪn/',
    mode: 'Sentence',
    phase: 'intermediate',
    difficulty: 'Medium',
    tips: 'Link "would like" smoothly and pause slightly after "discuss".',
    syllableBreakdown: ['I', 'would', 'like', 'to', 'dis-cuss', 'the', 'pro-ject', 'time-line'],
    topicTag: 'Meetings'
  },
  {
    id: 's-2',
    phrase: 'Could you please clarify our key quarterly objectives?',
    ipa: '/kʊd juː pliːz ˈklærəfaɪ aʊər kiː ˈkwɔːrtərli əbˈdʒektɪvz/',
    mode: 'Sentence',
    phase: 'business',
    difficulty: 'Hard',
    tips: 'Maintain rising intonation on "clarify" for a polite tone.',
    syllableBreakdown: ['Could', 'you', 'please', 'clar-i-fy', 'our', 'key', 'quar-ter-ly', 'ob-jec-tives'],
    topicTag: 'Workplace'
  },

  // ================= 3. SHADOWING PRACTICE MODE =================
  {
    id: 'sh-1',
    phrase: 'From my perspective, quality and reliability matter most.',
    ipa: '/frɒm maɪ pərˈspektɪv ˈkwɒləti ænd rɪˌlaɪəˈbɪləti ˈmætər moʊst/',
    mode: 'Shadowing',
    phase: 'advanced',
    difficulty: 'Hard',
    tips: 'Listen carefully to native voice cadence and repeat immediately with matching rhythm.',
    syllableBreakdown: ['From', 'my', 'per-spec-tive', 'qual-i-ty', 'and', 're-li-a-bil-i-ty', 'mat-ter', 'most'],
    topicTag: 'Public Speaking'
  }
];

export const initialWeakWordsList = [
  { word: 'Particularly', ipa: '/pərˈtɪkjələrli/', tip: 'Break into par-tic-u-lar-ly' },
  { word: 'Development', ipa: '/dɪˈveləpmənt/', tip: 'Stress the "vel" syllable' }
];
