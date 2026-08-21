import { LessonItem } from '../types';

export const lessonsIntermediate: LessonItem[] = [
  {
    id: 'inter-1',
    title: 'Popular Idioms & Natural Expressions',
    description: 'Understand common native English idioms used in everyday conversations.',
    phase: 'intermediate',
    category: 'Fluency',
    durationMins: 15,
    xpPoints: 45,
    iconName: 'zap',
    vocabulary: [
      {
        word: 'Hit the nail on the head',
        phonetic: '/hɪt ðə neɪl ɒn ðə hed/',
        translation: 'To be exactly right',
        definition: 'To describe exactly what is causing a situation or problem.',
        example: 'Your explanation hit the nail on the head!'
      },
      {
        word: 'Break the ice',
        phonetic: '/breɪk ðə aɪs/',
        translation: 'Relieve tension in a social setting',
        definition: 'To initiate conversation in a social setting to make people feel comfortable.',
        example: 'He told a funny story to break the ice.'
      },
      {
        word: 'Bite the bullet',
        phonetic: '/baɪt ðə ˈbʊlɪt/',
        translation: 'Face a difficult situation with courage',
        definition: 'To force yourself to do something difficult or unpleasant.',
        example: 'I decided to bite the bullet and apologize.'
      }
    ],
    grammarRule: {
      title: 'Present Perfect vs. Past Simple',
      explanation: 'Use Past Simple for specific finished times ("yesterday"), and Present Perfect for experiences up to now.',
      examples: [
        'I visited London in 2022. (Past Simple - specific time)',
        'I have visited London three times. (Present Perfect - life experience)'
      ]
    },
    quizQuestions: [
      {
        question: 'What does "break the ice" mean?',
        options: [
          'To freeze water',
          'To make a social situation more relaxed',
          'To start an argument',
          'To cancel a meeting'
        ],
        correctIndex: 1,
        explanation: '"Break the ice" means easing social stiffness when starting a conversation.'
      }
    ]
  },
  {
    id: 'inter-2',
    title: 'Essential Phrasal Verbs in Context',
    description: 'Master high-frequency multi-word verbs like figure out, bring up, and call off.',
    phase: 'intermediate',
    category: 'Vocabulary',
    durationMins: 14,
    xpPoints: 40,
    iconName: 'layers',
    vocabulary: [
      {
        word: 'Figure out',
        phonetic: '/ˈfɪɡjər aʊt/',
        translation: 'Solve / Understand',
        definition: 'To discover or understand something after thinking about it.',
        example: 'We need to figure out how to fix this issue.'
      },
      {
        word: 'Call off',
        phonetic: '/kɔːl ɒf/',
        translation: 'Cancel',
        definition: 'To cancel an event or agreement.',
        example: 'They had to call off the match due to rain.'
      },
      {
        word: 'Look forward to',
        phonetic: '/lʊk ˈfɔːrwərd tuː/',
        translation: 'Anticipate with pleasure',
        definition: 'To feel excited about something that is going to happen.',
        example: 'I am looking forward to our trip next week.'
      }
    ]
  },
  {
    id: 'inter-3',
    title: 'Expressing Opinions, Agreement & Disagreement',
    description: 'Phrases for diplomatically sharing your perspective, agreeing politely, or disagreeing with tact.',
    phase: 'intermediate',
    category: 'Discussion Skills',
    durationMins: 16,
    xpPoints: 50,
    iconName: 'message-circle',
    vocabulary: [
      {
        word: 'From my perspective',
        phonetic: '/frɒm maɪ pərˈspektɪv/',
        translation: 'In my view',
        definition: 'Used to state your personal viewpoint on a topic.',
        example: 'From my perspective, quality matters more than speed.'
      },
      {
        word: 'I see your point, but...',
        phonetic: '/aɪ siː jʊər pɔɪnt bʌt/',
        translation: 'Polite disagreement transition',
        definition: 'Acknowledges someone else\'s point before introducing an alternative view.',
        example: 'I see your point, but we must also consider the budget.'
      }
    ]
  },
  {
    id: 'inter-4',
    title: 'Storytelling & Narrative Past Tenses',
    description: 'Learn how to weave engaging stories using Past Continuous, Past Perfect, and sequencing adverbs.',
    phase: 'intermediate',
    category: 'Narrative',
    durationMins: 18,
    xpPoints: 55,
    iconName: 'book-open',
    vocabulary: [
      {
        word: 'Coincidentally',
        phonetic: '/koʊˌɪnsɪˈdentli/',
        translation: 'By chance happening',
        definition: 'In a way that results from a remarkable coincidence.',
        example: 'Coincidentally, we bumped into each other at the airport.'
      },
      {
        word: 'Out of the blue',
        phonetic: '/aʊt əv ðə bluː/',
        translation: 'Unexpectedly',
        definition: 'Without warning or notice; unexpectedly.',
        example: 'She received a phone call out of the blue.'
      }
    ]
  }
];
