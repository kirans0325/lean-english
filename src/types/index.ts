export type LearningPhase = 'basics' | 'intermediate' | 'advanced' | 'business';
export type VoiceGender = 'female' | 'male' | 'neutral';
export type VoiceAccent = 'en-IN' | 'en-US' | 'en-GB';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phase: LearningPhase;
  daily_goal: number;
  default_gender?: VoiceGender; // User's preferred default voice gender (female/male)
}

export interface LessonItem {
  id: string;
  title: string;
  description: string;
  phase: LearningPhase;
  category: string;
  durationMins: number;
  xpPoints: number;
  iconName: string;
  vocabulary: {
    word: string;
    phonetic: string;
    translation: string;
    definition: string;
    example: string;
  }[];
  grammarRule?: {
    title: string;
    explanation: string;
    examples: string[];
  };
  quizQuestions?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface MediaResource {
  id: string;
  title: string;
  type: 'movie' | 'short_film' | 'news';
  phase: LearningPhase;
  sourceName: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl?: string;
  summary: string;
  transcript: {
    speaker: string;
    speakerGender?: VoiceGender;
    text: string;
    timestamp: string;
    keyVocabulary?: string[];
  }[];
  simplifiedText?: string;
  originalText?: string;
  keyVocabList: {
    word: string;
    definition: string;
  }[];
}

export interface ConversationTurn {
  id: string;
  speaker: 'partner' | 'user';
  speakerGender?: VoiceGender;
  text: string;
  audioText: string;
  hintOptions?: string[];
  explanation?: string;
}

export interface DailyConversationScenario {
  id: string;
  title: string;
  scenario: string;
  phase: LearningPhase;
  partnerName: string;
  partnerRole: string;
  partnerGender: VoiceGender;
  avatarUrl: string;
  turns: ConversationTurn[];
}

export interface StoryParagraph {
  id: string;
  text: string;
  audioGender: VoiceGender;
  keyWords: { word: string; definition: string }[];
  comprehensionQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface PracticeStory {
  id: string;
  title: string;
  subtitle: string;
  phase: LearningPhase;
  genre: string;
  estimatedReadMins: number;
  xpPoints: number;
  coverImage: string;
  paragraphs: StoryParagraph[];
}

export interface SpeechSprintPrompt {
  id: string;
  topicTitle: string;
  category: string;
  phase: LearningPhase;
  promptDescription: string;
  suggestedPoints: string[];
  targetWordCount: number;
}

export interface WordScoreFeedback {
  word: string;
  status: 'green' | 'yellow' | 'red';
  score: number;
}

export interface PronunciationEvaluation {
  phraseText: string;
  spokenText: string;
  accuracyScore: number;
  wordFeedback: WordScoreFeedback[];
  phoneticGuide?: string;
}

export interface SpokenHistoryRecord {
  id?: number;
  phraseText: string;
  userTranscription: string;
  accuracyScore: number;
  phase: LearningPhase;
  feedbackDetails: WordScoreFeedback[];
  createdAt: string;
}
