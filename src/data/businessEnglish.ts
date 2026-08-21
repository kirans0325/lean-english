import { LessonItem } from '../types';

export const businessEnglishLessons: LessonItem[] = [
  {
    id: 'biz-1',
    title: 'Professional Email Writing & Etiquette',
    description: 'Structure formal emails, follow-ups, requests, and diplomacy in written workplace communication.',
    phase: 'business',
    category: 'Corporate Writing',
    durationMins: 18,
    xpPoints: 55,
    iconName: 'mail',
    vocabulary: [
      {
        word: 'Enclosed / Attached',
        phonetic: '/ɪnˈkloʊzd/',
        translation: 'Included in document',
        definition: 'Placed in the same envelope or attached to an email message.',
        example: 'Please find the quarterly report attached for your review.'
      },
      {
        word: 'Follow up',
        phonetic: '/ˈfɑːloʊ ʌp/',
        translation: 'Check on progress',
        definition: 'To pursue further action or inquiry on a previous communication.',
        example: 'I am writing to follow up on our discussion from Tuesday.'
      },
      {
        word: 'At your earliest convenience',
        phonetic: '/æt jʊər ˈɜːrliɪst kənˈviːniəns/',
        translation: 'As soon as possible (polite)',
        definition: 'A polite formal way to request a prompt response.',
        example: 'Kindly provide your confirmation at your earliest convenience.'
      }
    ],
    grammarRule: {
      title: 'Diplomatic Softening Language',
      explanation: 'Use modal verbs (could, would, might) to make requests and feedback polite in business.',
      examples: [
        'Direct: Change this report -> Softened: Could you please revise this section when you get a chance?',
        'Direct: That is wrong -> Softened: I might suggest a slightly different approach.'
      ]
    }
  },
  {
    id: 'biz-2',
    title: 'Job Interview Mastery & Pitching',
    description: 'Learn how to answer behavioral interview questions (STAR method) and articulate your accomplishments.',
    phase: 'business',
    category: 'Career Growth',
    durationMins: 20,
    xpPoints: 60,
    iconName: 'briefcase',
    vocabulary: [
      {
        word: 'Leverage',
        phonetic: '/ˈlevərɪdʒ/',
        translation: 'Utilize for advantage',
        definition: 'To use something to maximum advantage.',
        example: 'I plan to leverage my analytical skills to drive business growth.'
      },
      {
        word: 'Track record',
        phonetic: '/træk ˈrekərd/',
        translation: 'Past accomplishments',
        definition: 'All the past achievements or failures of a person or organization.',
        example: 'She has a proven track record in software product management.'
      },
      {
        word: 'Synergy',
        phonetic: '/ˈsɪnərdʒi/',
        translation: 'Combined effort gain',
        definition: 'The interaction or cooperation of two or more organizations or agents.',
        example: 'Our team created great synergy across marketing and sales.'
      }
    ]
  },
  {
    id: 'biz-3',
    title: 'Meeting Dynamics & Negotiations',
    description: 'Key phrases for taking the floor, interrupting politely, clarifying points, and negotiating win-win outcomes.',
    phase: 'business',
    category: 'Negotiation',
    durationMins: 22,
    xpPoints: 65,
    iconName: 'trending-up',
    vocabulary: [
      {
        word: 'Consensus',
        phonetic: '/kənˈsensəs/',
        translation: 'General agreement',
        definition: 'A general agreement reached by a group of people.',
        example: 'We reached a consensus on the project timeline.'
      },
      {
        word: 'Counterproposal',
        phonetic: '/ˈkaʊntər prəˈpoʊzl/',
        translation: 'Alternative offer',
        definition: 'An offer made in response to another offer during negotiation.',
        example: 'The client submitted a reasonable counterproposal.'
      }
    ]
  },
  {
    id: 'biz-4',
    title: 'Agile Project Management & Sprint Reviews',
    description: 'Vocabulary for standups, retrospectives, blockers, deliverables, and stakeholder management.',
    phase: 'business',
    category: 'Project Management',
    durationMins: 18,
    xpPoints: 55,
    iconName: 'sliders',
    vocabulary: [
      {
        word: 'Deliverable',
        phonetic: '/dɪˈlɪvərəbl/',
        translation: 'Tangible output product',
        definition: 'A thing that can be provided as a result of a process.',
        example: 'Our primary deliverable for Q3 is the mobile application deployment.'
      },
      {
        word: 'Blocker',
        phonetic: '/ˈblɑːkər/',
        translation: 'Obstacle',
        definition: 'An obstacle that prevents progress on a task.',
        example: 'Do you have any blockers preventing you from finishing the feature?'
      }
    ]
  },
  {
    id: 'biz-5',
    title: 'Investor Pitching & Financial Terminology',
    description: 'Structure elevator pitches, discuss return on investment (ROI), valuation, and market expansion.',
    phase: 'business',
    category: 'Startup & Finance',
    durationMins: 24,
    xpPoints: 70,
    iconName: 'dollar-sign',
    vocabulary: [
      {
        word: 'Valuation',
        phonetic: '/ˌvæljuˈeɪʃn/',
        translation: 'Estimated worth',
        definition: 'An estimation of something\'s worth, especially a company\'s market value.',
        example: 'The startup secured a $10 million valuation during series A.'
      },
      {
        word: 'Scalability',
        phonetic: '/ˌskeɪləˈbɪləti/',
        translation: 'Capacity to expand',
        definition: 'The capacity to be changed in size or scale to accommodate growth.',
        example: 'Investors love software businesses due to their high scalability.'
      }
    ]
  }
];
