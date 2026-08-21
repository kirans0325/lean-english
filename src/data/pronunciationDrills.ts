import { LearningPhase } from '../types';

export interface PronunciationDrill {
  id: string;
  phrase: string;
  phonetic: string;
  phase: LearningPhase;
  category: 'Word' | 'Sentence';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tips: string;
  topicTag: string; // e.g., 'Daily Life', 'Travel', 'Work', 'Interview', 'Fluency'
}

export const pronunciationDrills: PronunciationDrill[] = [
  // ==================== BASICS PHASE ====================
  {
    id: 'drill-b1',
    phrase: 'Pronunciation',
    phonetic: '/prəˌnʌnsiˈeɪʃn/',
    phase: 'basics',
    category: 'Word',
    difficulty: 'Medium',
    tips: 'Notice the third syllable is "nun" (/nʌn/), not "noun".',
    topicTag: 'Fluency'
  },
  {
    id: 'drill-b2',
    phrase: 'Good morning! How are you doing today?',
    phonetic: '/ɡʊd ˈmɔːrnɪŋ haʊ ɑːr juː ˈduːɪŋ təˈdeɪ/',
    phase: 'basics',
    category: 'Sentence',
    difficulty: 'Easy',
    tips: 'Focus on linking "How are" smoothly into "you doing".',
    topicTag: 'Daily Life'
  },
  {
    id: 'drill-b3',
    phrase: 'Could I please have a glass of water and the menu?',
    phonetic: '/kʊd aɪ pliːz hæv ə ɡlæs əv ˈwɔːtər ænd ðə ˈmenjuː/',
    phase: 'basics',
    category: 'Sentence',
    difficulty: 'Easy',
    tips: 'Polite dining phrase. Keep the rhythm smooth on "Could I please".',
    topicTag: 'Dining'
  },
  {
    id: 'drill-b4',
    phrase: 'Where is the nearest bus stop or metro station?',
    phonetic: '/weər ɪz ðə ˈnɪərɪst bʌs stɒp ɔːr ˈmetroʊ ˈsteɪʃn/',
    phase: 'basics',
    category: 'Sentence',
    difficulty: 'Easy',
    tips: 'Slight upward pitch at "bus stop" and downward at "station".',
    topicTag: 'Travel'
  },
  {
    id: 'drill-b5',
    phrase: 'It is a pleasure to meet you for the first time.',
    phonetic: '/ɪt ɪz ə ˈpleʒər tuː miːt juː fɔːr ðə fɜːrst taɪm/',
    phase: 'basics',
    category: 'Sentence',
    difficulty: 'Easy',
    tips: 'Emphasize "pleasure" and "first time".',
    topicTag: 'Daily Life'
  },
  {
    id: 'drill-b6',
    phrase: 'Comfortable',
    phonetic: '/ˈkʌmftəbl/',
    phase: 'basics',
    category: 'Word',
    difficulty: 'Medium',
    tips: 'Native speakers drop the middle vowel: pronounce as "cumf-ter-bul".',
    topicTag: 'Fluency'
  },

  // ==================== INTERMEDIATE PHASE ====================
  {
    id: 'drill-i1',
    phrase: 'Particularly',
    phonetic: '/pərˈtɪkjələrli/',
    phase: 'intermediate',
    category: 'Word',
    difficulty: 'Hard',
    tips: 'Keep the rhythm steady on "par-tic-u-lar-ly".',
    topicTag: 'Fluency'
  },
  {
    id: 'drill-i2',
    phrase: 'I am really looking forward to working with your team.',
    phonetic: '/aɪ æm ˈrɪəli ˈlʊkɪŋ ˈfɔːrwərd tuː ˈwɜːrkɪŋ wɪð jʊər tiːm/',
    phase: 'intermediate',
    category: 'Sentence',
    difficulty: 'Medium',
    tips: 'Stress "looking forward" and "team".',
    topicTag: 'Work'
  },
  {
    id: 'drill-i3',
    phrase: 'From my perspective, quality and reliability matter most.',
    phonetic: '/frɒm maɪ pərˈspektɪv ˈkwɒləti ænd rɪˌlaɪəˈbɪləti ˈmætər moʊst/',
    phase: 'intermediate',
    category: 'Sentence',
    difficulty: 'Medium',
    tips: 'Pause slightly after "perspective" to highlight your opinion.',
    topicTag: 'Discussion'
  },
  {
    id: 'drill-i4',
    phrase: 'Coincidentally, we met at the airport out of the blue.',
    phonetic: '/koʊˌɪnsɪˈdentli wiː met æt ðə ˈeər-pɔːrt aʊt əv ðə bluː/',
    phase: 'intermediate',
    category: 'Sentence',
    difficulty: 'Medium',
    tips: 'Idiom practice: "Out of the blue" means unexpected.',
    topicTag: 'Fluency'
  },
  {
    id: 'drill-i5',
    phrase: 'Could you please clarify how this solution solves the main problem?',
    phonetic: '/kʊd juː pliːz ˈklærəfaɪ haʊ ðɪs səˈluːʃn sɒlvz ðə meɪn ˈprɒbləm/',
    phase: 'intermediate',
    category: 'Sentence',
    difficulty: 'Medium',
    tips: 'Polite clarification phrase for meetings.',
    topicTag: 'Work'
  },

  // ==================== ADVANCED PHASE ====================
  {
    id: 'drill-a1',
    phrase: 'Quintessential',
    phonetic: '/ˌkwɪntɪˈsenʃl/',
    phase: 'advanced',
    category: 'Word',
    difficulty: 'Hard',
    tips: 'Main stress falls on the syllable "sen".',
    topicTag: 'Fluency'
  },
  {
    id: 'drill-a2',
    phrase: 'Articulating complex ideas with clarity requires consistent practice.',
    phonetic: '/ɑːrˈtɪkjulaɪtɪŋ kəmˈpleks aɪˈdɪəz wɪð ˈklærəti rɪˈkwaɪərz kənˈsɪstənt ˈpræktɪs/',
    phase: 'advanced',
    category: 'Sentence',
    difficulty: 'Hard',
    tips: 'Maintain natural intonation pauses after "ideas" and "clarity".',
    topicTag: 'Public Speaking'
  },
  {
    id: 'drill-a3',
    phrase: 'Not only did the team exceed targets, but they also inspired the audience.',
    phonetic: '/nɒt ˈoʊnli dɪd ðə tiːm ɪkˈsiːd ˈtɑːrɡɪts bʌt ðeɪ ˈɔːlsoʊ ɪnˈspaɪərd ðə ˈɔːdiəns/',
    phase: 'advanced',
    category: 'Sentence',
    difficulty: 'Hard',
    tips: 'Inversion sentence structure for formal emphasis.',
    topicTag: 'Rhetoric'
  },
  {
    id: 'drill-a4',
    phrase: 'Understanding cultural nuances is vital for global diplomacy.',
    phonetic: '/ˌʌndərˈstændɪŋ ˈkʌltʃərəl ˈnuːɑːnsɪz ɪz ˈvaɪtl fɔːr ˈɡloʊbl dɪˈploʊməsi/',
    phase: 'advanced',
    category: 'Sentence',
    difficulty: 'Hard',
    tips: 'Emphasize "cultural nuances" and "global diplomacy".',
    topicTag: 'Diplomacy'
  },

  // ==================== BUSINESS ENGLISH ====================
  {
    id: 'drill-biz1',
    phrase: 'Return on investment',
    phonetic: '/rɪˈtɜːrn ɒn ɪnˈvestmənt/',
    phase: 'business',
    category: 'Word',
    difficulty: 'Medium',
    tips: 'Common acronym ROI. Pronounce "investment" clearly at the end.',
    topicTag: 'Finance'
  },
  {
    id: 'drill-biz2',
    phrase: 'Please find the proposal attached for your review at your earliest convenience.',
    phonetic: '/pliːz faɪnd ðə prəˈpoʊzl əˈtætʃt fɔːr jʊər rɪˈvjuː æt jʊər ˈɜːrliɪst kənˈviːniəns/',
    phase: 'business',
    category: 'Sentence',
    difficulty: 'Hard',
    tips: 'Formal email sentence. Stress "proposal", "attached", and "earliest convenience".',
    topicTag: 'Interview'
  },
  {
    id: 'drill-biz3',
    phrase: 'Throughout my career, I have leveraged data-driven strategies to scale key projects.',
    phonetic: '/θruːˈaʊt maɪ kəˈrɪər aɪ hæv ˈliːvərɪdʒd ˈdeɪtə-ˈdrɪvn ˈstrætədʒiz tuː skeɪl kiː ˈprɒdʒekts/',
    phase: 'business',
    category: 'Sentence',
    difficulty: 'Hard',
    tips: 'High-impact STAR interview response sentence.',
    topicTag: 'Interview'
  },
  {
    id: 'drill-biz4',
    phrase: 'We have reached a strong consensus regarding our strategic quarter targets.',
    phonetic: '/wiː hæv riːtʃt ə strɒŋ kənˈsensəs rɪˈɡɑːrdɪŋ aʊər strəˈtiːdʒɪk ˈkwɔːrtər ˈtɑːrɡɪts/',
    phase: 'business',
    category: 'Sentence',
    difficulty: 'Hard',
    tips: 'Meeting negotiation phrase emphasizing agreement.',
    topicTag: 'Work'
  }
];
