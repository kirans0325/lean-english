import { LessonItem } from '../types';

export const lessonsBasics: LessonItem[] = [
  {
    id: 'basic-1',
    title: 'Daily Greetings & Introductions',
    description: 'Master how to greet people naturally in everyday situations and introduce yourself.',
    phase: 'basics',
    category: 'Daily Life',
    durationMins: 10,
    xpPoints: 30,
    iconName: 'smile',
    vocabulary: [
      {
        word: 'Hello',
        phonetic: '/həˈloʊ/',
        translation: 'Greeting used when meeting someone',
        definition: 'A universal greeting used in both formal and casual settings.',
        example: 'Hello! It is nice to meet you.'
      },
      {
        word: 'Pleased',
        phonetic: '/pliːzd/',
        translation: 'Glad / Happy',
        definition: 'Feeling happy or satisfied about something.',
        example: 'I am very pleased to make your acquaintance.'
      },
      {
        word: 'Introduction',
        phonetic: '/ˌɪntrəˈdʌkʃn/',
        translation: 'Making known',
        definition: 'The act of making yourself or someone else known by name.',
        example: 'Let me give a quick introduction before we begin.'
      }
    ],
    grammarRule: {
      title: 'Subject Pronouns + Verb "To Be"',
      explanation: 'Use I am, You are, He/She/It is to introduce yourself and describe states.',
      examples: [
        'I am Sarah. (Name)',
        'You are a student. (Role)',
        'He is friendly. (Trait)'
      ]
    },
    quizQuestions: [
      {
        question: 'Which is the most polite greeting for a morning meeting?',
        options: ['Good morning', 'Hey check this out', 'What is up', 'Bye'],
        correctIndex: 0,
        explanation: '"Good morning" is polite and appropriate for professional and casual morning settings.'
      },
      {
        question: 'Complete the sentence: "Hello, I ___ John from London."',
        options: ['is', 'am', 'are', 'be'],
        correctIndex: 1,
        explanation: 'Use "am" with the first-person singular pronoun "I".'
      }
    ]
  },
  {
    id: 'basic-2',
    title: 'Essential Vocabulary: Food & Dining',
    description: 'Learn fundamental words for ordering food, drinks, and paying at restaurants.',
    phase: 'basics',
    category: 'Dining',
    durationMins: 12,
    xpPoints: 35,
    iconName: 'coffee',
    vocabulary: [
      {
        word: 'Beverage',
        phonetic: '/ˈbevərɪdʒ/',
        translation: 'Drink',
        definition: 'A drink other than water (such as tea, coffee, juice).',
        example: 'Would you like a warm beverage?'
      },
      {
        word: 'Delicious',
        phonetic: '/dɪˈlɪʃəs/',
        translation: 'Tasty',
        definition: 'Highly pleasant to taste.',
        example: 'This soup is absolutely delicious.'
      },
      {
        word: 'Bill / Check',
        phonetic: '/bɪl/',
        translation: 'Payment request',
        definition: 'A printed statement of money owed for food and service.',
        example: 'Could we please have the bill?'
      }
    ],
    grammarRule: {
      title: 'Making Polite Requests with "Would like"',
      explanation: 'Instead of saying "I want", native speakers say "I would like" or "Could I have".',
      examples: [
        'I would like a black coffee, please.',
        'Could I have the menu?'
      ]
    },
    quizQuestions: [
      {
        question: 'How do you politely ask for coffee in English?',
        options: ['Give me coffee', 'I would like a coffee, please', 'Coffee now', 'Bring coffee'],
        correctIndex: 1,
        explanation: '"I would like..." is the standard polite phrasing.'
      }
    ]
  },
  {
    id: 'basic-3',
    title: 'Numbers, Time & Schedules',
    description: 'Understand how to tell time, state dates, and schedule meetings.',
    phase: 'basics',
    category: 'Time Management',
    durationMins: 8,
    xpPoints: 25,
    iconName: 'clock',
    vocabulary: [
      {
        word: 'Schedule',
        phonetic: '/ˈskedʒuːl/',
        translation: 'Time plan',
        definition: 'A plan that gives expected times for activities.',
        example: 'My schedule is flexible this afternoon.'
      },
      {
        word: 'Quarter past',
        phonetic: '/ˈkwɔːrtər pæst/',
        translation: '15 minutes after the hour',
        definition: 'Used in telling time for 15 minutes after an hour.',
        example: 'The meeting starts at a quarter past ten (10:15).'
      }
    ]
  },
  {
    id: 'basic-4',
    title: 'Asking for Directions & Transport',
    description: 'Learn how to navigate cities, ask where locations are, and catch buses or trains.',
    phase: 'basics',
    category: 'Travel & Navigation',
    durationMins: 14,
    xpPoints: 40,
    iconName: 'map-pin',
    vocabulary: [
      {
        word: 'Intersection',
        phonetic: '/ˌɪntərˈsekʃn/',
        translation: 'Street junction',
        definition: 'A point at which two or more roads meet and cross.',
        example: 'Turn left at the next intersection.'
      },
      {
        word: 'Straight ahead',
        phonetic: '/streɪt əˈhed/',
        translation: 'Directly forward',
        definition: 'Continuing in the same forward direction without turning.',
        example: 'The museum is straight ahead, past the park.'
      },
      {
        word: 'Ticket counter',
        phonetic: '/ˈtɪkɪt ˈkaʊntər/',
        translation: 'Place to buy travel passes',
        definition: 'The location where transportation tickets are purchased.',
        example: 'You can buy train passes at the main ticket counter.'
      }
    ],
    grammarRule: {
      title: 'Prepositions of Place (in, on, at, next to)',
      explanation: 'Use "at" for specific locations, "on" for street names/floors, and "next to" for adjacent spots.',
      examples: [
        'At the station.',
        'On Fifth Avenue.',
        'Next to the pharmacy.'
      ]
    }
  },
  {
    id: 'basic-5',
    title: 'Family, Friends & Social Life',
    description: 'Vocabulary for describing family members, friends, personalities, and relationships.',
    phase: 'basics',
    category: 'Social',
    durationMins: 10,
    xpPoints: 30,
    iconName: 'heart',
    vocabulary: [
      {
        word: 'Sibling',
        phonetic: '/ˈsɪblɪŋ/',
        translation: 'Brother or sister',
        definition: 'A brother or sister.',
        example: 'Do you have any siblings living in London?'
      },
      {
        word: 'Generous',
        phonetic: '/ˈdʒenərəs/',
        translation: 'Kind and sharing',
        definition: 'Showing kindness and readiness to give more of something than expected.',
        example: 'She is a very generous and thoughtful friend.'
      }
    ]
  }
];
