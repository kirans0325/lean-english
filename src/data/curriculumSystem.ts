import { VoiceGender } from '../types';

export interface CurriculumActivity {
  id: string;
  type: 'LEARN' | 'LISTEN' | 'UNDERSTAND' | 'PRACTICE' | 'SPEAK' | 'FEEDBACK';
  title: string;
  durationMins: number;

  // 1. LEARN Activity Data
  learnPhrases?: {
    phrase: string;
    phonetic: string;
    meaning: string;
    realLifeExample: string;
  }[];

  // 2. LISTEN Activity Data
  listenDialogue?: {
    speaker: string;
    gender: VoiceGender;
    line: string;
  }[];

  // 3. UNDERSTAND Activity Data
  understandQuestions?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];

  // 4. PRACTICE Activity Data
  practiceExercise?: {
    type: 'fill_blank' | 'phrase_select';
    prompt: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  };

  // 5. SPEAK Activity Data
  speakPrompt?: {
    situation: string;
    targetSentenceToSpeak: string;
    audioHintGender: VoiceGender;
  };

  // 6. FEEDBACK Data
  feedbackData?: {
    grammarCorrection: string;
    nativeAlternative: string;
    pronunciationTip: string;
    fluencyScore: number;
    improvementSuggestion: string;
  };
}

export interface CurriculumLesson {
  id: string;
  title: string;
  estimatedTimeMins: number; // 3 to 10 mins
  situationContext: string;
  activities: CurriculumActivity[];
}

export interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  lessons: CurriculumLesson[];
}

export interface CurriculumCategory {
  id: string;
  categoryName: string;
  icon: string;
  color: string;
  description: string;
  modules: CurriculumModule[];
}

export const structuredCurriculumSystem: CurriculumCategory[] = [
  // ================= 1. DAILY CONVERSATION =================
  {
    id: 'cat-1',
    categoryName: 'Daily Conversation',
    icon: '🗣️',
    color: '#8B5CF6',
    description: 'Master spontaneous small talk, dining out, and everyday social interactions.',
    modules: [
      {
        id: 'mod-1-1',
        title: 'Module 1: Casual Greetings & Small Talk',
        description: 'Break the ice effortlessly in social settings.',
        lessons: [
          {
            id: 'les-1-1-1',
            title: 'Lesson 1: Catching Up with Friends & Neighbors',
            estimatedTimeMins: 6,
            situationContext: 'Greeting a friend at a local coffee shop and asking about their week.',
            activities: [
              {
                id: 'act-1',
                type: 'LEARN',
                title: '1. LEARN (3 Essential Phrases)',
                durationMins: 1,
                learnPhrases: [
                  {
                    phrase: 'How have you been keeping?',
                    phonetic: '/haʊ hæv juː biːn ˈkiːpɪŋ/',
                    meaning: 'Warm, natural way to ask how someone has been lately.',
                    realLifeExample: 'Hey Sarah! Long time no see, how have you been keeping?'
                  },
                  {
                    phrase: 'Can’t complain, to be honest.',
                    phonetic: '/kænt kəmˈpleɪn tuː biː ˈɒnɪst/',
                    meaning: 'Common relaxed response when things are going well.',
                    realLifeExample: 'Work is busy, but I can’t complain, to be honest.'
                  },
                  {
                    phrase: 'What have you been up to lately?',
                    phonetic: '/wɒt hæv juː biːn ʌp tuː ˈleɪtli/',
                    meaning: 'Asking about recent activities or life updates.',
                    realLifeExample: 'Sounds great! What have you been up to lately?'
                  }
                ]
              },
              {
                id: 'act-2',
                type: 'LISTEN',
                title: '2. LISTEN (Café Catch-up Dialogue)',
                durationMins: 1,
                listenDialogue: [
                  { speaker: 'Emma (Lady)', gender: 'female', line: 'Hi Mark! I haven’t seen you in weeks, how have you been keeping?' },
                  { speaker: 'Mark (Male)', gender: 'male', line: 'Can’t complain, to be honest! Just wrapped up a big project at work.' },
                  { speaker: 'Emma (Lady)', gender: 'female', line: 'That’s awesome! What have you been up to lately outside of work?' },
                  { speaker: 'Mark (Male)', gender: 'male', line: 'Mostly hiking on weekends. How about you?' }
                ]
              },
              {
                id: 'act-3',
                type: 'UNDERSTAND',
                title: '3. UNDERSTAND (Comprehension Check)',
                durationMins: 1,
                understandQuestions: [
                  {
                    question: 'What does Mark mean when he says "Can\'t complain, to be honest"?',
                    options: ['He is angry', 'Things are going well overall', 'He has many complaints', 'He wants to leave'],
                    correctIndex: 1,
                    explanation: '"Can\'t complain" is a friendly, relaxed way to say everything is good.'
                  }
                ]
              },
              {
                id: 'act-4',
                type: 'PRACTICE',
                title: '4. PRACTICE (Phrase Selection)',
                durationMins: 1,
                practiceExercise: {
                  type: 'phrase_select',
                  prompt: 'Complete the greeting: "Hey John! ___ lately?"',
                  options: ['What have you been up to', 'Where are you go', 'Why you do that'],
                  correctAnswer: 'What have you been up to',
                  explanation: '"What have you been up to" is the correct natural present perfect continuous form.'
                }
              },
              {
                id: 'act-5',
                type: 'SPEAK',
                title: '5. SPEAK (Voice Response)',
                durationMins: 1,
                speakPrompt: {
                  situation: 'Your friend asks how you have been. Respond using "Can’t complain, to be honest."',
                  targetSentenceToSpeak: 'Can’t complain to be honest, work has been great!',
                  audioHintGender: 'female'
                }
              },
              {
                id: 'act-6',
                type: 'FEEDBACK',
                title: '6. FEEDBACK (AI Personal Coach Report)',
                durationMins: 1,
                feedbackData: {
                  grammarCorrection: 'Natural use of present perfect phrase.',
                  nativeAlternative: '"Can\'t complain at all, everything is going smoothly!"',
                  pronunciationTip: 'Link "can\'t complain" without a sharp pause.',
                  fluencyScore: 88,
                  improvementSuggestion: 'Keep your intonation rising slightly on "to be honest" to sound friendly.'
                }
              }
            ]
          }
        ]
      }
    ]
  },

  // ================= 2. WORKPLACE ENGLISH =================
  {
    id: 'cat-2',
    categoryName: 'Workplace English',
    icon: '💼',
    color: '#10B981',
    description: 'Polite requests, explaining technical delays, and communicating with managers.',
    modules: [
      {
        id: 'mod-2-1',
        title: 'Module 1: Explaining Technical Problems & Delays',
        description: 'Communicate challenges clearly without losing credibility.',
        lessons: [
          {
            id: 'les-2-1-1',
            title: 'Lesson 1: Explaining a Project Delay to Your Manager',
            estimatedTimeMins: 7,
            situationContext: 'Briefing your manager on a 2-day milestone delay due to API issues.',
            activities: [
              {
                id: 'act-1',
                type: 'LEARN',
                title: '1. LEARN (3 Diplomatic Phrases)',
                durationMins: 1,
                learnPhrases: [
                  {
                    phrase: 'The main reason for the delay is...',
                    phonetic: '/ðə meɪn ˈriːzn fɔːr ðə dɪˈleɪ ɪz/',
                    meaning: 'Directly state the root cause of an issue professionally.',
                    realLifeExample: 'The main reason for the delay is an unexpected server outage.'
                  },
                  {
                    phrase: 'We are currently working on...',
                    phonetic: '/wiː ɑːr ˈkʌrəntli ˈwɜːrkɪŋ ɒn/',
                    meaning: 'Show active troubleshooting progress.',
                    realLifeExample: 'We are currently working on a security patch.'
                  },
                  {
                    phrase: 'I expect the project to be completed by...',
                    phonetic: '/aɪ ɪkˈspekt ðə ˈprɒdʒekt tuː biː kəmˈpliːtɪd baɪ/',
                    meaning: 'Provide a committed new completion time.',
                    realLifeExample: 'I expect the project to be completed by Friday afternoon.'
                  }
                ]
              },
              {
                id: 'act-2',
                type: 'LISTEN',
                title: '2. LISTEN (Manager Update Dialogue)',
                durationMins: 1,
                listenDialogue: [
                  { speaker: 'Victoria (Manager)', gender: 'female', line: 'Hi David, do you have a moment for a quick project status update?' },
                  { speaker: 'David (Engineer)', gender: 'male', line: 'Sure Victoria! The main reason for the delay is an unexpected API integration issue.' },
                  { speaker: 'Victoria (Manager)', gender: 'female', line: 'I see. What is the current mitigation plan?' },
                  { speaker: 'David (Engineer)', gender: 'male', line: 'We are currently working on a patch, and I expect the project to be completed by Friday.' }
                ]
              },
              {
                id: 'act-3',
                type: 'UNDERSTAND',
                title: '3. UNDERSTAND (Comprehension Check)',
                durationMins: 1,
                understandQuestions: [
                  {
                    question: 'Why did David use "We are currently working on" instead of "We will work on"?',
                    options: ['To sound angry', 'To demonstrate active, ongoing progress right now', 'To delay the meeting', 'It means the same thing'],
                    correctIndex: 1,
                    explanation: 'Present continuous ("working on") highlights active progress already taking place.'
                  }
                ]
              },
              {
                id: 'act-4',
                type: 'PRACTICE',
                title: '4. PRACTICE (Fill-in-the-blank)',
                durationMins: 1,
                practiceExercise: {
                  type: 'fill_blank',
                  prompt: 'Complete: "I expect the report to be ___ by tomorrow morning."',
                  options: ['completed', 'completing', 'complete'],
                  correctAnswer: 'completed',
                  explanation: 'Passive structure "to be completed by" requires past participle.'
                }
              },
              {
                id: 'act-5',
                type: 'SPEAK',
                title: '5. SPEAK (Voice Response)',
                durationMins: 1,
                speakPrompt: {
                  situation: 'Tell your manager about the updated completion time.',
                  targetSentenceToSpeak: 'I expect the project to be completed by Friday afternoon.',
                  audioHintGender: 'female'
                }
              },
              {
                id: 'act-6',
                type: 'FEEDBACK',
                title: '6. FEEDBACK (AI Personal Coach Report)',
                durationMins: 1,
                feedbackData: {
                  grammarCorrection: 'Excellent passive voice construction.',
                  nativeAlternative: '"I anticipate wrapping this up by Friday afternoon at the latest."',
                  pronunciationTip: 'Stress the second syllable in "completed" (/kəmˈpliːtɪd/).',
                  fluencyScore: 92,
                  improvementSuggestion: 'Pause slightly after "Friday" for natural emphasis.'
                }
              }
            ]
          }
        ]
      }
    ]
  },

  // ================= 3. MEETINGS & PRESENTATIONS =================
  {
    id: 'cat-3',
    categoryName: 'Meetings & Presentations',
    icon: '📊',
    color: '#0EA5E9',
    description: 'Introducing yourself, interrupting politely, disagreeing constructively, and leading discussions.',
    modules: [
      {
        id: 'mod-3-1',
        title: 'Module 1: Opening & Leading Meetings',
        description: 'Set a clear agenda and gain room attention immediately.',
        lessons: [
          {
            id: 'les-3-1-1',
            title: 'Lesson 1: Introducing Yourself & Setting Meeting Objectives',
            estimatedTimeMins: 8,
            situationContext: 'Starting a cross-functional project kickoff meeting.',
            activities: [
              {
                id: 'act-1',
                type: 'LEARN',
                title: '1. LEARN (3 Kickoff Phrases)',
                durationMins: 1,
                learnPhrases: [
                  {
                    phrase: 'The main goal of today’s meeting is to...',
                    phonetic: '/ðə meɪn ɡoʊl əv təˈdeɪz ˈmiːtɪŋ ɪz tuː/',
                    meaning: 'Clear focus statement at meeting start.',
                    realLifeExample: 'The main goal of today’s meeting is to align on Q4 targets.'
                  },
                  {
                    phrase: 'Before we dive in, let’s quickly...',
                    phonetic: '/bɪˈfɔːr wiː daɪv ɪn lets ˈkwɪkli/',
                    meaning: 'Transitions smoothly into agenda introduction.',
                    realLifeExample: 'Before we dive in, let’s quickly review the agenda.'
                  },
                  {
                    phrase: 'I’d like to turn the floor over to...',
                    phonetic: '/aɪd laɪk tuː tɜːrn ðə flɔːr ˈoʊvər tuː/',
                    meaning: 'Politely pass speaking control to another teammate.',
                    realLifeExample: 'I’d like to turn the floor over to Mark for product updates.'
                  }
                ]
              },
              {
                id: 'act-2',
                type: 'LISTEN',
                title: '2. LISTEN (Kickoff Meeting Dialogue)',
                durationMins: 1,
                listenDialogue: [
                  { speaker: 'Sophia (Host)', gender: 'female', line: 'Welcome everyone! The main goal of today’s meeting is to finalize our Q4 marketing campaign.' },
                  { speaker: 'Sophia (Host)', gender: 'female', line: 'Before we dive in, let’s quickly confirm if everyone can view the presentation slides.' },
                  { speaker: 'Alex (Team)', gender: 'male', line: 'Yes, slides are perfectly visible on screen!' }
                ]
              },
              {
                id: 'act-3',
                type: 'UNDERSTAND',
                title: '3. UNDERSTAND (Comprehension Check)',
                durationMins: 1,
                understandQuestions: [
                  {
                    question: 'What is the purpose of saying "Before we dive in"?',
                    options: ['To end the meeting', 'To set expectations before starting main topic', 'To ask for coffee', 'To complain about work'],
                    correctIndex: 1,
                    explanation: '"Before we dive in" creates a smooth conversational transition.'
                  }
                ]
              },
              {
                id: 'act-4',
                type: 'PRACTICE',
                title: '4. PRACTICE (Sentence Ordering)',
                durationMins: 1,
                practiceExercise: {
                  type: 'phrase_select',
                  prompt: 'Select the best phrase: "The main goal of today’s meeting ___ align on our budget."',
                  options: ['is to', 'are to', 'was for'],
                  correctAnswer: 'is to',
                  explanation: 'Singular subject "The main goal" requires "is to".'
                }
              },
              {
                id: 'act-5',
                type: 'SPEAK',
                title: '5. SPEAK (Voice Practice)',
                durationMins: 1,
                speakPrompt: {
                  situation: 'Open the meeting by declaring the main goal.',
                  targetSentenceToSpeak: 'The main goal of today’s meeting is to align on our roadmap.',
                  audioHintGender: 'female'
                }
              },
              {
                id: 'act-6',
                type: 'FEEDBACK',
                title: '6. FEEDBACK (AI Personal Coach Report)',
                durationMins: 1,
                feedbackData: {
                  grammarCorrection: 'Perfect sentence structure for executive meetings.',
                  nativeAlternative: '"Our primary objective today is aligning on key roadmap milestones."',
                  pronunciationTip: 'Keep stress on "main goal" and "roadmap".',
                  fluencyScore: 90,
                  improvementSuggestion: 'Project your voice clearly at the beginning of the phrase.'
                }
              }
            ]
          }
        ]
      }
    ]
  },

  // ================= 4. INTERVIEW PRACTICE =================
  {
    id: 'cat-4',
    categoryName: 'Interview Practice',
    icon: '🎯',
    color: '#EC4899',
    description: 'STAR method answers, discussing career achievements, and answering tricky questions.',
    modules: [
      {
        id: 'mod-4-1',
        title: 'Module 1: Answering Behavioral Interview Questions',
        description: 'Structure high-impact responses using Situation, Task, Action, Result.',
        lessons: [
          {
            id: 'les-4-1-1',
            title: 'Lesson 1: Describing Past Achievements with Impact',
            estimatedTimeMins: 8,
            situationContext: 'Responding to "Tell me about a time you handled a difficult challenge."',
            activities: [
              {
                id: 'act-1',
                type: 'LEARN',
                title: '1. LEARN (3 STAR Response Phrases)',
                durationMins: 1,
                learnPhrases: [
                  {
                    phrase: 'In my previous role at...',
                    phonetic: '/ɪn maɪ ˈpriːviəs roʊl æt/',
                    meaning: 'Clear background setup for interview stories.',
                    realLifeExample: 'In my previous role at TechCorp, I led a cross-functional squad.'
                  },
                  {
                    phrase: 'To address this challenge, I decided to...',
                    phonetic: '/tuː əˈdres ðɪs ˈtʃælɪndʒ aɪ dɪˈsaɪdɪd tuː/',
                    meaning: 'Highlights proactive leadership and individual action.',
                    realLifeExample: 'To address this challenge, I decided to implement automated testing.'
                  },
                  {
                    phrase: 'As a result, we managed to increase...',
                    phonetic: '/æz ə rɪˈzʌlt wiː ˈmænɪdʒd tuː ɪnˈkriːs/',
                    meaning: 'Quantifies positive business impact.',
                    realLifeExample: 'As a result, we managed to increase system speed by 35%.'
                  }
                ]
              },
              {
                id: 'act-2',
                type: 'LISTEN',
                title: '2. LISTEN (Job Interview Dialogue)',
                durationMins: 1,
                listenDialogue: [
                  { speaker: 'Interviewer (Male)', gender: 'male', line: 'Could you give an example of how you handle tight project deadlines?' },
                  { speaker: 'Candidate (Female)', gender: 'female', line: 'In my previous role, we faced a tight release window. To address this challenge, I prioritized core user features first.' },
                  { speaker: 'Candidate (Female)', gender: 'female', line: 'As a result, we delivered the app on schedule with 100% test coverage.' }
                ]
              },
              {
                id: 'act-3',
                type: 'UNDERSTAND',
                title: '3. UNDERSTAND (Comprehension Check)',
                durationMins: 1,
                understandQuestions: [
                  {
                    question: 'Why is "As a result" effective in interview answers?',
                    options: ['It shows quantifiable impact and successful closure', 'It ends the interview', 'It avoids answering', 'It sounds casual'],
                    correctIndex: 0,
                    explanation: '"As a result" connects your actions directly to tangible business success.'
                  }
                ]
              },
              {
                id: 'act-4',
                type: 'PRACTICE',
                title: '4. PRACTICE (Phrase Matching)',
                durationMins: 1,
                practiceExercise: {
                  type: 'phrase_select',
                  prompt: 'Select the best phrase: "To address this challenge, I ___ to automate daily builds."',
                  options: ['decided', 'deciding', 'decision'],
                  correctAnswer: 'decided',
                  explanation: 'Past simple verb "decided" correctly states individual past action.'
                }
              },
              {
                id: 'act-5',
                type: 'SPEAK',
                title: '5. SPEAK (Voice Answer)',
                durationMins: 1,
                speakPrompt: {
                  situation: 'State your interview result statement clearly.',
                  targetSentenceToSpeak: 'As a result, we managed to increase user retention by twenty percent.',
                  audioHintGender: 'female'
                }
              },
              {
                id: 'act-6',
                type: 'FEEDBACK',
                title: '6. FEEDBACK (AI Personal Coach Report)',
                durationMins: 1,
                feedbackData: {
                  grammarCorrection: 'Strong, impactful metric statement.',
                  nativeAlternative: '"Consequently, we boosted user retention rates by twenty percent."',
                  pronunciationTip: 'Emphasize "twenty percent" to highlight your metric.',
                  fluencyScore: 94,
                  improvementSuggestion: 'Maintain confident eye contact tone while speaking.'
                }
              }
            ]
          }
        ]
      }
    ]
  }
];
