import { LearningPhase, VoiceGender } from '../types';

export interface UsefulPhrase {
  phrase: string;
  explanation: string;
}

export interface ConversationReportData {
  overallScore: number;
  subScores: {
    fluency: number;
    pronunciation: number;
    grammar: number;
    vocabulary: number;
  };
  whatYouDidWell: string[];
  grammarCorrections: { mistake: string; correction: string; reason: string }[];
  betterNaturalPhrases: { spoken: string; natural: string }[];
  pronunciationIssues: { word: string; score: number; tip: string }[];
  recommendedNextPractice: string;
}

export interface AIRoleplayScenario {
  id: string;
  title: string;
  scenario: string;
  userRole: string;
  aiRole: string;
  phase: LearningPhase;
  difficulty: 'Basics' | 'Intermediate' | 'Advanced' | 'Business';
  estimatedTimeMins: number;
  skills: string[];
  partnerName: string;
  partnerGender: VoiceGender;
  avatarUrl: string;
  usefulPhrases: UsefulPhrase[];
  turns: {
    id: string;
    speaker: 'partner' | 'user';
    speakerGender?: VoiceGender;
    text: string;
    audioText: string;
    hintOptions?: string[];
  }[];
  sampleReport: ConversationReportData;
}

export const aiRoleplayScenarios: AIRoleplayScenario[] = [
  {
    id: 'sim-1',
    title: 'Explaining a Project Delay to Your Manager',
    scenario: 'You need to explain a 2-day milestone delay to your manager due to unexpected API technical issues and present a mitigation plan.',
    userRole: 'Project Engineer',
    aiRole: 'Engineering Manager (Victoria)',
    phase: 'intermediate',
    difficulty: 'Intermediate',
    estimatedTimeMins: 5,
    skills: ['Speaking', 'Workplace English', 'Confidence'],
    partnerName: 'Victoria (Lady Manager)',
    partnerGender: 'female',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    usefulPhrases: [
      { phrase: 'The main reason for the delay is...', explanation: 'Clear statement of root cause.' },
      { phrase: 'We are currently working on...', explanation: 'Describes active troubleshooting.' },
      { phrase: 'I expect the project to be completed by...', explanation: 'Sets a realistic committed deadline.' },
      { phrase: 'One possible solution would be...', explanation: 'Proposes proactive problem solving.' }
    ],
    turns: [
      {
        id: 't1',
        speaker: 'partner',
        speakerGender: 'female',
        text: 'Hi Alex, thanks for stopping by. I noticed the Q3 integration task was rescheduled. Could you walk me through the situation?',
        audioText: 'Hi Alex, thanks for stopping by. I noticed the Q3 integration task was rescheduled. Could you walk me through the situation?'
      },
      {
        id: 't2',
        speaker: 'user',
        text: 'The main reason for the delay is an unexpected backend API rate limit. We are currently working on a caching patch to resolve it.',
        audioText: 'The main reason for the delay is an unexpected backend API rate limit. We are currently working on a caching patch to resolve it.',
        hintOptions: [
          'The main reason for the delay is a third-party API issue. We are patching it now.',
          'We ran into an unexpected bug, but we expect completion by Friday afternoon.'
        ]
      },
      {
        id: 't3',
        speaker: 'partner',
        speakerGender: 'female',
        text: 'I understand. What is your updated estimate for delivery, and do we need to alert stakeholders?',
        audioText: 'I understand. What is your updated estimate for delivery, and do we need to alert stakeholders?'
      },
      {
        id: 't4',
        speaker: 'user',
        text: 'I expect the project to be completed by Friday 3 PM. One possible solution would be to deploy a staging preview first.',
        audioText: 'I expect the project to be completed by Friday 3 PM. One possible solution would be to deploy a staging preview first.',
        hintOptions: [
          'I expect completion by Friday at 3 PM, so no major stakeholder delay is needed.',
          'One possible solution would be to push the preview environment first.'
        ]
      },
      {
        id: 't5',
        speaker: 'partner',
        speakerGender: 'female',
        text: 'That sounds like a solid plan. Thanks for keeping me updated so promptly!',
        audioText: 'That sounds like a solid plan. Thanks for keeping me updated so promptly!'
      }
    ],
    sampleReport: {
      overallScore: 82,
      subScores: {
        fluency: 85,
        pronunciation: 78,
        grammar: 80,
        vocabulary: 88
      },
      whatYouDidWell: [
        'Used professional diplomatic phrasing ("The main reason for the delay is...").',
        'Maintained a confident, steady speech pace.',
        'Proactively presented a clear resolution timeline.'
      ],
      grammarCorrections: [
        {
          mistake: 'We currently work on patch',
          correction: 'We are currently working on a patch',
          reason: 'Use Present Continuous for active ongoing tasks.'
        }
      ],
      betterNaturalPhrases: [
        {
          spoken: 'I expect completion Friday 3 PM',
          natural: 'I anticipate wrapping up by Friday at 3 PM.'
        }
      ],
      pronunciationIssues: [
        { word: 'Unexpected', score: 65, tip: 'Stress the third syllable: /ˌʌnɪkˈspektɪd/.' },
        { word: 'Solution', score: 70, tip: 'Keep the second vowel clear: /səˈluːʃn/.' }
      ],
      recommendedNextPractice: 'Practice the "Investor Pitching" 1-Minute Speech Sprint to build executive confidence!'
    }
  },
  {
    id: 'sim-2',
    title: 'Ordering Specialty Coffee at a Busy London Café',
    scenario: 'You are ordering coffee and pastries at an artisanal café during morning rush hour.',
    userRole: 'Customer',
    aiRole: 'Head Barista (Emma)',
    phase: 'basics',
    difficulty: 'Basics',
    estimatedTimeMins: 4,
    skills: ['Daily Conversation', 'Polite Requests', 'Fluency'],
    partnerName: 'Emma (Lady Barista)',
    partnerGender: 'female',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    usefulPhrases: [
      { phrase: 'I would like to order a...', explanation: 'Standard polite ordering phrase.' },
      { phrase: 'Could I get that with...', explanation: 'Customizing your milk or size preference.' },
      { phrase: 'How much is the total?', explanation: 'Asking for final payment amount.' }
    ],
    turns: [
      {
        id: 't1',
        speaker: 'partner',
        speakerGender: 'female',
        text: 'Good morning! Welcome to Artisanal Roast. What can I get started for you today?',
        audioText: 'Good morning! Welcome to Artisanal Roast. What can I get started for you today?'
      },
      {
        id: 't2',
        speaker: 'user',
        text: 'Hi Emma! I would like an oat milk cappuccino and a croissant, please.',
        audioText: 'Hi Emma! I would like an oat milk cappuccino and a croissant, please.',
        hintOptions: [
          'I would like an oat milk cappuccino, please.',
          'Can I get a black Americano and a muffin?'
        ]
      }
    ],
    sampleReport: {
      overallScore: 90,
      subScores: {
        fluency: 92,
        pronunciation: 88,
        grammar: 90,
        vocabulary: 90
      },
      whatYouDidWell: [
        'Polite greeting and clear order specification.',
        'Smooth pronunciation of menu items.'
      ],
      grammarCorrections: [],
      betterNaturalPhrases: [
        {
          spoken: 'I want cappuccino',
          natural: 'I would like an oat cappuccino, please.'
        }
      ],
      pronunciationIssues: [
        { word: 'Cappuccino', score: 82, tip: 'Soft "c" sound: /ˌkæpʊˈtʃiːnoʊ/.' }
      ],
      recommendedNextPractice: 'Try the "Hotel Check-In" conversation to practice travel phrases!'
    }
  }
];
