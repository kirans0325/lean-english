import { DailyConversationScenario } from '../types';

export const dailyConversations: DailyConversationScenario[] = [
  {
    id: 'conv-1',
    title: 'Ordering Coffee at a London Café',
    scenario: 'Practice ordering your favorite morning beverage and pastry with a friendly barista.',
    phase: 'basics',
    partnerName: 'Emma (Lady Barista)',
    partnerRole: 'Barista',
    partnerGender: 'female',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    turns: [
      {
        id: 'turn-1',
        speaker: 'partner',
        speakerGender: 'female',
        text: 'Good morning! Welcome to Artisanal Roast. What can I get started for you today?',
        audioText: 'Good morning! Welcome to Artisanal Roast. What can I get started for you today?'
      },
      {
        id: 'turn-2',
        speaker: 'user',
        text: 'Hi Emma! I would like an oat milk cappuccino and a croissant, please.',
        audioText: 'Hi Emma! I would like an oat milk cappuccino and a croissant, please.',
        hintOptions: [
          'I would like an oat milk cappuccino, please.',
          'Can I get a black Americano and a muffin?',
          'Just a glass of iced water, thank you.'
        ],
        explanation: 'Saying "I would like..." is the standard polite phrasing.'
      },
      {
        id: 'turn-3',
        speaker: 'partner',
        speakerGender: 'female',
        text: 'Great choice! Would you like that drink regular or large, and for here or to go?',
        audioText: 'Great choice! Would you like that drink regular or large, and for here or to go?'
      },
      {
        id: 'turn-4',
        speaker: 'user',
        text: 'A large, please, and I will have it to go. How much is the total?',
        audioText: 'A large, please, and I will have it to go. How much is the total?',
        hintOptions: [
          'A large, please, to go. How much does it cost?',
          'Regular size, for here, please.'
        ]
      },
      {
        id: 'turn-5',
        speaker: 'partner',
        speakerGender: 'female',
        text: 'That will be £6.50 in total. You can tap your card right on the terminal!',
        audioText: 'That will be £6.50 in total. You can tap your card right on the terminal!'
      }
    ]
  },
  {
    id: 'conv-2',
    title: 'Hotel Check-In & Room Preference',
    scenario: 'Check into a boutique hotel, request a high floor with a view, and ask about breakfast hours.',
    phase: 'basics',
    partnerName: 'Sophia (Lady Receptionist)',
    partnerRole: 'Front Desk Host',
    partnerGender: 'female',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    turns: [
      {
        id: 'turn-1',
        speaker: 'partner',
        speakerGender: 'female',
        text: 'Welcome to the Grand Heritage Hotel! May I have your name for the reservation?',
        audioText: 'Welcome to the Grand Heritage Hotel! May I have your name for the reservation?'
      },
      {
        id: 'turn-2',
        speaker: 'user',
        text: 'Good evening! I have a reservation under my name for two nights. Could I request a room on a quiet upper floor?',
        audioText: 'Good evening! I have a reservation under my name for two nights. Could I request a room on a quiet upper floor?',
        hintOptions: [
          'Good evening! Yes, reservation under my name for two nights.',
          'Hi! I booked a room with a city view.'
        ]
      },
      {
        id: 'turn-3',
        speaker: 'partner',
        speakerGender: 'female',
        text: 'Certainly! I have assigned you room 704 on the top floor with a city skyline view. Breakfast is served on the mezzanine floor from 7 to 10 AM.',
        audioText: 'Certainly! I have assigned you room 704 on the top floor with a city skyline view. Breakfast is served on the mezzanine floor from 7 to 10 AM.'
      }
    ]
  },
  {
    id: 'conv-3',
    title: 'Discussing Movie Recommendations & Opinions',
    scenario: 'Share your thoughts on recent films, favorite genres, and recommendation highlights with a movie enthusiast friend.',
    phase: 'intermediate',
    partnerName: 'Liam (Male Critic)',
    partnerRole: 'Film Critic Friend',
    partnerGender: 'male',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    turns: [
      {
        id: 'turn-1',
        speaker: 'partner',
        speakerGender: 'male',
        text: 'Hey! Have you watched any captivating movies or short films lately?',
        audioText: 'Hey! Have you watched any captivating movies or short films lately?'
      },
      {
        id: 'turn-2',
        speaker: 'user',
        text: 'Yes! I recently saw a fascinating sci-fi film. The plot twists were absolutely mind-blowing!',
        audioText: 'Yes! I recently saw a fascinating sci-fi film. The plot twists were absolutely mind-blowing!',
        hintOptions: [
          'Yes! I watched a brilliant documentary about nature.',
          'Not recently, but I am looking for good recommendations!'
        ]
      },
      {
        id: 'turn-3',
        speaker: 'partner',
        speakerGender: 'male',
        text: 'Sounds amazing! Who was your favorite character, and what made the dialogue so memorable?',
        audioText: 'Sounds amazing! Who was your favorite character, and what made the dialogue so memorable?'
      }
    ]
  },
  {
    id: 'conv-4',
    title: 'Job Interview Pitch & Salary Negotiation',
    scenario: 'Engage in a high-stakes interview scenario for a Senior Project Lead position with a Corporate HR Director.',
    phase: 'advanced',
    partnerName: 'Victoria Sterling (Lady VP)',
    partnerRole: 'VP of Global Talent Acquisition',
    partnerGender: 'female',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    turns: [
      {
        id: 'turn-1',
        speaker: 'partner',
        speakerGender: 'female',
        text: 'Thank you for taking the time today. Could you articulate how your strategic background aligns with our expanded roadmap?',
        audioText: 'Thank you for taking the time today. Could you articulate how your strategic background aligns with our expanded roadmap?'
      },
      {
        id: 'turn-2',
        speaker: 'user',
        text: 'Certainly, Victoria. Throughout my career, I have leveraged data-driven frameworks to scale cross-functional initiatives efficiently.',
        audioText: 'Certainly, Victoria. Throughout my career, I have leveraged data-driven frameworks to scale cross-functional initiatives efficiently.',
        hintOptions: [
          'Throughout my career, I have led cross-functional teams to deliver projects ahead of schedule.',
          'I specialize in strategic planning, optimizing workflows, and maximizing team productivity.'
        ]
      }
    ]
  }
];
