import { MediaResource } from '../types';

export const mediaResources: MediaResource[] = [
  {
    id: 'media-1',
    title: 'The Pursuit of Happyness - "Protect Your Dream"',
    type: 'movie',
    phase: 'intermediate',
    sourceName: 'Columbia Pictures',
    duration: '2:15',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
    summary: 'Chris Gardner (Will Smith) gives his son iconic advice on perseverance, dreaming big, and overcoming doubt on a basketball court.',
    transcript: [
      {
        speaker: 'Chris (Father)',
        speakerGender: 'male',
        text: "Don't ever let somebody tell you... You can't do something. Not even me. All right?",
        timestamp: '00:15',
        keyVocabulary: ['Don\'t ever', 'Not even me']
      },
      {
        speaker: 'Son',
        speakerGender: 'male',
        text: 'All right.',
        timestamp: '00:22'
      },
      {
        speaker: 'Chris (Father)',
        speakerGender: 'male',
        text: "You got a dream... You gotta protect it. People can't do somethin' themselves, they wanna tell you you can't do it. If you want somethin', go get it. Period.",
        timestamp: '00:30',
        keyVocabulary: ['Protect', 'Gotta', 'Period']
      }
    ],
    keyVocabList: [
      {
        word: 'Protect',
        definition: 'To keep safe from harm or loss.'
      },
      {
        word: 'Gotta',
        definition: 'Informal spoken contraction of "have got to" or "got to".'
      },
      {
        word: 'Period',
        definition: 'Used at the end of a statement to indicate finality (no further argument).'
      }
    ]
  },
  {
    id: 'media-2',
    title: 'Short Film: The Secret of Effective Communication',
    type: 'short_film',
    phase: 'basics',
    sourceName: 'BBC Learning English',
    duration: '3:40',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
    summary: 'A short film depicting how active listening and body language transform everyday workplace interactions.',
    transcript: [
      {
        speaker: 'Narrator (Lady)',
        speakerGender: 'female',
        text: 'Communication is not just about the words you speak. It starts with listening attentively to others.',
        timestamp: '00:10'
      },
      {
        speaker: 'Alex (Engineer)',
        speakerGender: 'male',
        text: 'When I started maintaining eye contact and nodding, my conversations improved immensely.',
        timestamp: '00:45'
      }
    ],
    keyVocabList: [
      {
        word: 'Attentively',
        definition: 'With paying close attention; thoughtfully.'
      },
      {
        word: 'Eye contact',
        definition: 'Looking directly into another person\'s eyes.'
      }
    ]
  },
  {
    id: 'media-3',
    title: 'Interstellar - "Do Not Go Gentle Into That Good Night"',
    type: 'movie',
    phase: 'advanced',
    sourceName: 'Paramount Pictures',
    duration: '3:10',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    summary: 'Professor Brand recites Dylan Thomas\' poem as astronauts launch into a wormhole to save humanity.',
    transcript: [
      {
        speaker: 'Professor Brand',
        speakerGender: 'male',
        text: 'Do not go gentle into that good night, Old age should burn and rave at close of day; Rage, rage against the dying of the light.',
        timestamp: '00:30',
        keyVocabulary: ['Rave', 'Rage against']
      }
    ],
    keyVocabList: [
      {
        word: 'Rage',
        definition: 'Feel or express violent uncontrollable anger.'
      },
      {
        word: 'Gentle',
        definition: 'Mild, quiet, or moderate in nature.'
      }
    ]
  },
  {
    id: 'media-4',
    title: 'Daily News: AI Innovations Transforming Global Education',
    type: 'news',
    phase: 'advanced',
    sourceName: 'Global Tech News Brief',
    duration: '4:10',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    summary: 'Recent advancements in artificial intelligence are providing personalized language tutors to millions across the globe.',
    simplifiedText: 'Artificial intelligence is changing how people learn languages. New smart applications adapt lessons to every student\'s speed, helping them practice speaking without fear.',
    originalText: 'Emerging artificial intelligence paradigms are revolutionizing pedagogical frameworks across continents. Personalized algorithms synthesize adaptive curricula tailored precisely to individual linguistic proficiency, mitigating affective filters in oral production.',
    transcript: [
      {
        speaker: 'Anchor (Lady)',
        speakerGender: 'female',
        text: 'Language learning is undergoing a profound paradigm shift as interactive AI models enable real-time accent scoring and conversational mastery.',
        timestamp: '00:05'
      }
    ],
    keyVocabList: [
      {
        word: 'Pedagogical',
        definition: 'Relating to teaching methods and education.'
      },
      {
        word: 'Mitigating',
        definition: 'Making something less severe, serious, or painful.'
      },
      {
        word: 'Paradigm Shift',
        definition: 'A fundamental change in approach or underlying assumptions.'
      }
    ]
  }
];
