import { SpeechSprintPrompt } from '../types';

export const oneMinutePrompts: SpeechSprintPrompt[] = [
  {
    id: 'sprint-1',
    topicTitle: 'Describe Your Dream Vacation',
    category: 'Travel & Culture',
    phase: 'basics',
    promptDescription: 'Speak continuously for 60 seconds describing your ideal holiday destination, what you would pack, and who you would travel with.',
    suggestedPoints: [
      'Hook: Introduce your dream destination (beach, mountains, historic city).',
      'Activities: Mention 2 or 3 things you want to do there.',
      'Companionship: Explain who you want to bring along.',
      'Conclusion: Summarize why this trip would be unforgettable.'
    ],
    targetWordCount: 90
  },
  {
    id: 'sprint-2',
    topicTitle: 'Pitch Your Favorite Movie in 60 Seconds',
    category: 'Entertainment & Film',
    phase: 'intermediate',
    promptDescription: 'Explain the central plot, key characters, emotional stakes, and why everyone should watch your favorite movie in 1 minute.',
    suggestedPoints: [
      'Opening Hook: State the movie title and genre.',
      'Plot Conflict: Describe the hero\'s main challenge.',
      'Standout Scene: Mention what makes the dialogue or action memorable.',
      'Call to Action: Give your final rating and recommendation.'
    ],
    targetWordCount: 115
  },
  {
    id: 'sprint-3',
    topicTitle: 'Why English Fluency Opens Global Careers',
    category: 'Career & Growth',
    phase: 'business',
    promptDescription: 'Deliver a 60-second persuasive pitch on how mastering English accelerates professional growth, international networking, and global mobility.',
    suggestedPoints: [
      'Thesis: English is the global language of business and technology.',
      'Key Benefit 1: Access to remote work and global companies.',
      'Key Benefit 2: Confidence in negotiations and conferences.',
      'Closing Takeaway: Fluency transforms career potential.'
    ],
    targetWordCount: 130
  },
  {
    id: 'sprint-4',
    topicTitle: 'How Artificial Intelligence is Changing Everyday Life',
    category: 'Technology & Future',
    phase: 'intermediate',
    promptDescription: 'Discuss how smart technology and AI tools are impacting work, learning, and daily productivity in 60 seconds.',
    suggestedPoints: [
      'Introduction: AI is no longer science fiction, it is part of daily routines.',
      'Example 1: Voice assistants and automated learning apps.',
      'Example 2: Smart workplace tools and efficiency.',
      'Conclusion: Balance technology with human creativity.'
    ],
    targetWordCount: 120
  },
  {
    id: 'sprint-5',
    topicTitle: 'A Difficult Challenge You Overcame',
    category: 'Personal Growth',
    phase: 'advanced',
    promptDescription: 'Share a personal narrative about facing a hard situation, how you tackled it, and what lesson you learned in 1 minute.',
    suggestedPoints: [
      'Situation: Introduce the problem or obstacle.',
      'Action: Describe what step-by-step action you took.',
      'Result: Explain the successful resolution.',
      'Reflection: Conclude with the main takeaway lesson.'
    ],
    targetWordCount: 125
  },
  {
    id: 'sprint-6',
    topicTitle: 'The Importance of Time Management & Focus',
    category: 'Productivity',
    phase: 'business',
    promptDescription: 'Explain how prioritizing tasks, avoiding distractions, and setting daily goals leads to sustained success.',
    suggestedPoints: [
      'Core Problem: Distractions consume valuable focus hours.',
      'Solution 1: Use time-blocking and setting clear priorities.',
      'Solution 2: Take structured breaks to maintain high energy.',
      'Closing Thought: Time is your most valuable asset.'
    ],
    targetWordCount: 125
  }
];
