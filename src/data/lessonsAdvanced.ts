import { LessonItem } from '../types';

export const lessonsAdvanced: LessonItem[] = [
  {
    id: 'adv-1',
    title: 'Rhetoric & Persuasive Speaking',
    description: 'Learn sophisticated vocabulary and sentence structures for debates and public address.',
    phase: 'advanced',
    category: 'Public Speaking',
    durationMins: 20,
    xpPoints: 60,
    iconName: 'award',
    vocabulary: [
      {
        word: 'Articulate',
        phonetic: '/ɑːrˈtɪkjuleɪt/',
        translation: 'Express clearly',
        definition: 'Expressing ideas or feelings fluently and coherently in speech.',
        example: 'She was able to articulate her vision convincingly.'
      },
      {
        word: 'Compelling',
        phonetic: '/kəmˈpelɪŋ/',
        translation: 'Evoking interest / Persuasive',
        definition: 'Evoking interest, attention, or admiration in a powerfully irresistible way.',
        example: 'The speaker presented a compelling case for renewable energy.'
      },
      {
        word: 'Nuance',
        phonetic: '/ˈnuːɑːns/',
        translation: 'Subtle difference',
        definition: 'A subtle difference in shade of meaning, expression, or sound.',
        example: 'To master advanced English, one must understand cultural nuances.'
      }
    ],
    grammarRule: {
      title: 'Inversion for Emphasis',
      explanation: 'Invert subject and verb after negative or limiting adverbials to add formal weight.',
      examples: [
        'Not only did he win the debate, but he also inspired the audience.',
        'Seldom have I heard such a passionate speech.'
      ]
    },
    quizQuestions: [
      {
        question: 'Which word describes a subtle difference in meaning?',
        options: ['Nuance', 'Contrast', 'Volume', 'Literal'],
        correctIndex: 0,
        explanation: 'Nuance refers to subtle distinctions in language or emotion.'
      }
    ]
  },
  {
    id: 'adv-2',
    title: 'Diplomatic & Indirect Phrasing',
    description: 'Master high-level euphemisms, hedging, and softening language for delicate situations.',
    phase: 'advanced',
    category: 'Diplomacy',
    durationMins: 22,
    xpPoints: 65,
    iconName: 'shield',
    vocabulary: [
      {
        word: 'Hedging',
        phonetic: '/ˈhedʒɪŋ/',
        translation: 'Cautious language',
        definition: 'The use of cautious or ambiguous language to avoid direct commitments.',
        example: 'Words like "suggest", "appear", and "tend to" are common hedging devices.'
      },
      {
        word: 'Plausible',
        phonetic: '/ˈplɔːzəbl/',
        translation: 'Seeming reasonable',
        definition: 'Seeming reasonable or probable.',
        example: 'That is a plausible explanation for the sudden delay.'
      }
    ]
  },
  {
    id: 'adv-3',
    title: 'Academic Writing & Literature Analysis',
    description: 'Analyze prose, formal essays, cause-and-effect structures, and scholarly vocabulary.',
    phase: 'advanced',
    category: 'Literature',
    durationMins: 25,
    xpPoints: 70,
    iconName: 'book',
    vocabulary: [
      {
        word: 'Substantiate',
        phonetic: '/səbˈstænʃieɪt/',
        translation: 'Provide evidence for',
        definition: 'Provide evidence to support or prove the truth of.',
        example: 'The research data substantiates our original hypothesis.'
      },
      {
        word: 'Paradigm',
        phonetic: '/ˈpærədaɪm/',
        translation: 'Typical model',
        definition: 'A typical example or pattern of something; a model.',
        example: 'The discovery marked a new paradigm in modern astrophysics.'
      }
    ]
  }
];
