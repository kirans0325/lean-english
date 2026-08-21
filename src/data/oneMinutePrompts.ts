import { LearningPhase } from '../types';

export type SprintDifficulty = 'Easy' | 'Intermediate' | 'Advanced' | 'Professional';

export interface SprintFeedbackReport {
  wordsSpoken: number;
  wpmSpeed: number;
  fillerWordCount: number;
  pauseCount: number;
  fluencyScore: number;
  grammarScore: number;
  youDidWellBecause: string[];
  tryImproving: string[];
  insteadOfSaying: string;
  moreNaturalVersion: string;
}

export interface StructuredSprintPrompt {
  id: string;
  topicTitle: string;
  difficulty: SprintDifficulty;
  prepTimeSeconds: number; // 15 seconds
  speakingTimeSeconds: number; // 60 seconds
  category: string;
  phase: LearningPhase;
  promptDescription: string;
  keywordSuggestions: string[];
  sampleReport: SprintFeedbackReport;
}

export const structuredSprintPrompts: StructuredSprintPrompt[] = [
  {
    id: 'sp-1',
    topicTitle: 'Describe Your Typical Workday',
    difficulty: 'Easy',
    prepTimeSeconds: 15,
    speakingTimeSeconds: 60,
    category: 'Daily Routine',
    phase: 'basics',
    promptDescription: 'Walk through your morning routine, core tasks, and how you wrap up your work day.',
    keywordSuggestions: ['To begin with...', 'My morning usually starts by...', 'Throughout the day I focus on...', 'Finally, I wrap up by...'],
    sampleReport: {
      wordsSpoken: 118,
      wpmSpeed: 118,
      fillerWordCount: 4,
      pauseCount: 2,
      fluencyScore: 86,
      grammarScore: 84,
      youDidWellBecause: [
        'Maintained a steady, readable speech pace throughout the 60 seconds.',
        'Used clear chronological transition phrases ("To begin with", "Finally").'
      ],
      tryImproving: [
        'Reduce reliance on "um" when transitioning between tasks.',
        'Keep sentence structure concise when listing daily duties.'
      ],
      insteadOfSaying: 'I start working and then I do emails',
      moreNaturalVersion: 'I begin my day by prioritizing urgent emails and setting key targets.'
    }
  },
  {
    id: 'sp-2',
    topicTitle: 'Explain a Problem You Recently Solved',
    difficulty: 'Intermediate',
    prepTimeSeconds: 15,
    speakingTimeSeconds: 60,
    category: 'Workplace Problem Solving',
    phase: 'intermediate',
    promptDescription: 'Explain an unexpected technical or team challenge you encountered and the solution you implemented.',
    keywordSuggestions: ['The main challenge was...', 'We noticed that...', 'To address this issue...', 'As a result...'],
    sampleReport: {
      wordsSpoken: 120,
      wpmSpeed: 120,
      fillerWordCount: 5,
      pauseCount: 3,
      fluencyScore: 82,
      grammarScore: 78,
      youDidWellBecause: [
        'Clear problem-to-solution structure using STAR response framework.',
        'Good use of action verbs ("addressed", "resolved", "implemented").'
      ],
      tryImproving: [
        'Pause deliberately at period endings instead of filling pauses with "like".',
        'Emphasize the final metric result for stronger impact.'
      ],
      insteadOfSaying: 'We had problem with database crash',
      moreNaturalVersion: 'We encountered an unexpected database bottleneck that impacted response times.'
    }
  },
  {
    id: 'sp-3',
    topicTitle: 'Describe Your Favorite Place',
    difficulty: 'Easy',
    prepTimeSeconds: 15,
    speakingTimeSeconds: 60,
    category: 'Personal Experience',
    phase: 'basics',
    promptDescription: 'Describe a memorable location, city, or nature spot you love visiting and why it is special.',
    keywordSuggestions: ['The place I love most is...', 'What makes it special is...', 'Whenever I visit...', 'I feel completely...'],
    sampleReport: {
      wordsSpoken: 110,
      wpmSpeed: 110,
      fillerWordCount: 3,
      pauseCount: 2,
      fluencyScore: 88,
      grammarScore: 86,
      youDidWellBecause: [
        'Rich descriptive vocabulary and relaxed intonation.',
        'Minimal filler words.'
      ],
      tryImproving: [
        'Try varying your pitch when expressing enthusiasm about the location.'
      ],
      insteadOfSaying: 'Place is very nice and good weather',
      moreNaturalVersion: 'The location is incredibly picturesque with pleasant weather year-round.'
    }
  },
  {
    id: 'sp-4',
    topicTitle: 'What Would You Do If You Became a Manager?',
    difficulty: 'Advanced',
    prepTimeSeconds: 15,
    speakingTimeSeconds: 60,
    category: 'Leadership & Strategy',
    phase: 'advanced',
    promptDescription: 'Outline your leadership philosophy, how you would support team growth, and handle project priorities.',
    keywordSuggestions: ['If I were appointed manager...', 'My primary focus would be...', 'I would empower the team by...', 'To ensure success...'],
    sampleReport: {
      wordsSpoken: 125,
      wpmSpeed: 125,
      fillerWordCount: 4,
      pauseCount: 2,
      fluencyScore: 85,
      grammarScore: 82,
      youDidWellBecause: [
        'Strong hypothetical second conditional structures ("If I were...", "I would...").',
        'Executive vocabulary usage.'
      ],
      tryImproving: [
        'Connect transition phrases smoothly.'
      ],
      insteadOfSaying: 'If I am manager I will talk to everyone',
      moreNaturalVersion: 'If I were to assume a management role, my priority would be conducting 1-on-1 check-ins.'
    }
  },
  {
    id: 'sp-5',
    topicTitle: 'Explain a Technical Process in Simple English',
    difficulty: 'Professional',
    prepTimeSeconds: 15,
    speakingTimeSeconds: 60,
    category: 'Technical Communication',
    phase: 'business',
    promptDescription: 'Take a complex technical concept (e.g. cloud computing, APIs, data security) and explain it simply to a non-technical client.',
    keywordSuggestions: ['To put it simply...', 'Think of it as...', 'In essential terms...', 'This means that...'],
    sampleReport: {
      wordsSpoken: 130,
      wpmSpeed: 130,
      fillerWordCount: 3,
      pauseCount: 1,
      fluencyScore: 90,
      grammarScore: 88,
      youDidWellBecause: [
        'Outstanding use of analogies to simplify complex ideas.',
        'High WPM fluency rate with minimal hesitation.'
      ],
      tryImproving: [
        'Ensure key terms are pronounced with crisp articulation.'
      ],
      insteadOfSaying: 'API is like data sending thing',
      moreNaturalVersion: 'An API acts as a waiter taking your request to the kitchen and bringing back data.'
    }
  }
];
