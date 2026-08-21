import { VoiceGender } from '../types';

export interface WarmUpPhrase {
  id: string;
  phrase: string;
  phonetic: string;
  translation: string;
  example: string;
}

export interface LearnPattern {
  id: string;
  pattern: string;
  usageContext: string;
  skillImproved: string;
  examples: { text: string; explanation: string; gender: VoiceGender }[];
}

export interface PracticeQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DailyPlanStepData {
  todayFocus: string;
  estimatedTimeMins: number;
  whyDoIt: string;
  skillImproved: string;
  nextStepRecommendation: string;
  warmUpPhrases: WarmUpPhrase[];
  learnPattern: LearnPattern;
  practiceQuestions: PracticeQuestion[];
  speakTargetSentence: string;
  coachFeedback: {
    fluencyScore: number;
    pronunciationScore: number;
    grammarTip: string;
    nativeAlternative: string;
    wordsToReview: string[];
  };
}

export const todayDailyPlan: DailyPlanStepData = {
  todayFocus: 'Workplace & Professional Communication',
  estimatedTimeMins: 10,
  whyDoIt: 'Master polite request patterns to gain confidence in team meetings & email discussions.',
  skillImproved: 'Professional Spoken Fluency & Diplomatic Phrasing',
  nextStepRecommendation: 'Try the 1-Minute Speech Sprint to build continuous speaking speed!',
  warmUpPhrases: [
    {
      id: 'w1',
      phrase: 'At your earliest convenience',
      phonetic: '/æt jʊər ˈɜːrliɪst kənˈviːniəns/',
      translation: 'As soon as possible (polite)',
      example: 'Please send the revised proposal at your earliest convenience.'
    },
    {
      id: 'w2',
      phrase: 'I would like to clarify',
      phonetic: '/aɪ wʊd laɪk tuː ˈklærəfaɪ/',
      translation: 'Clear up understanding',
      example: 'Before we proceed, I would like to clarify our project deadline.'
    },
    {
      id: 'w3',
      phrase: 'Could you please provide',
      phonetic: '/kʊd juː pliːz prəˈvaɪd/',
      translation: 'Polite request for information',
      example: 'Could you please provide the financial summary for Q3?'
    }
  ],
  learnPattern: {
    id: 'lp1',
    pattern: 'Diplomatic Softening ("Could you please..." / "Would it be possible to...")',
    usageContext: 'Used in corporate environments to request actions without sounding demanding.',
    skillImproved: 'Professional Speech Diplomacy & Workplace Politeness',
    examples: [
      {
        text: 'Could you please review the attached document when you have a moment?',
        explanation: 'Softens direct commands into polite professional requests.',
        gender: 'female'
      },
      {
        text: 'Would it be possible to reschedule our meeting to tomorrow afternoon?',
        explanation: 'Expresses flexibility while suggesting an alternative time.',
        gender: 'male'
      }
    ]
  },
  practiceQuestions: [
    {
      id: 'pq1',
      prompt: 'Complete the polite workplace request: "___ you please send me the updated quarterly report?"',
      options: ['Could', 'Must', 'Should', 'Will'],
      correctIndex: 0,
      explanation: '"Could you please..." is the standard diplomatic request format in business.'
    },
    {
      id: 'pq2',
      prompt: 'Which phrase is most diplomatic for clarifying a misunderstanding?',
      options: [
        'You are completely wrong',
        'I would like to clarify our agreement',
        'Why did you say that',
        'Forget what you said'
      ],
      correctIndex: 1,
      explanation: '"I would like to clarify..." addresses misunderstandings constructively.'
    }
  ],
  speakTargetSentence: 'Could you please clarify the main objective before we submit the proposal?',
  coachFeedback: {
    fluencyScore: 92,
    pronunciationScore: 88,
    grammarTip: 'Great use of modal verb "Could". Remember to link "could you" smoothly (/kʊdʒu/).',
    nativeAlternative: '"Could you please clarify our key priorities before submission?"',
    wordsToReview: ['Clarify', 'Objective', 'Submission']
  }
};
