import { PracticeStory } from '../types';

export const practiceStories: PracticeStory[] = [
  {
    id: 'story-1',
    title: 'The Coffee Shop Connection',
    subtitle: 'A warm story about making unexpected friends in a busy London café.',
    phase: 'basics',
    genre: 'Everyday Life',
    estimatedReadMins: 5,
    xpPoints: 50,
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    paragraphs: [
      {
        id: 'p1',
        text: 'On a cool autumn morning in London, Sophia walked into a cozy coffee shop near Covent Garden. Rain drops trickled down the glass windows, and the aroma of freshly roasted espresso filled the air. She found a quiet wooden table near the corner.',
        audioGender: 'female',
        keyWords: [
          { word: 'Cozy', definition: 'Giving a feeling of comfort, warmth, and relaxation.' },
          { word: 'Aroma', definition: 'A distinctive, typically pleasant smell.' }
        ],
        comprehensionQuestion: {
          question: 'Where was the coffee shop located?',
          options: ['Near Covent Garden', 'At London Airport', 'Inside a library', 'By the river Thames'],
          correctIndex: 0,
          explanation: 'The story states Sophia walked into a coffee shop near Covent Garden.'
        }
      },
      {
        id: 'p2',
        text: 'While waiting for her hot cappuccino, an elderly man named Arthur asked politely if he could share the remaining seat at her table. Sophia smiled warmly and gestured to the chair. They quickly struck up a cheerful conversation about art and music.',
        audioGender: 'female',
        keyWords: [
          { word: 'Politely', definition: 'In a respectful and considerate manner.' },
          { word: 'Struck up', definition: 'Started or initiated (a conversation or relationship).' }
        ]
      }
    ]
  },
  {
    id: 'story-2',
    title: 'The Global Tech Venture',
    subtitle: 'An inspiring tale of international teamwork, innovation, and overcoming cultural barriers.',
    phase: 'intermediate',
    genre: 'Business & Tech',
    estimatedReadMins: 8,
    xpPoints: 75,
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    paragraphs: [
      {
        id: 'p1',
        text: 'Elena, a software engineer from Madrid, joined a distributed team working on an artificial intelligence project in San Francisco. Communication across time zones was initially daunting, but their shared passion for technology united them.',
        audioGender: 'female',
        keyWords: [
          { word: 'Daunting', definition: 'Seeming difficult to deal with in anticipation; intimidating.' },
          { word: 'Distributed team', definition: 'A workforce operating from different geographical locations.' }
        ]
      },
      {
        id: 'p2',
        text: 'During the sprint review presentation, Elena articulated her architectural redesign with remarkable clarity. Her colleagues applauded her initiative, proving that dedication transcends language barriers.',
        audioGender: 'female',
        keyWords: [
          { word: 'Articulated', definition: 'Expressed fluently and coherently.' },
          { word: 'Transcends', definition: 'Goes beyond or surpasses standard limits.' }
        ]
      }
    ]
  }
];
