export interface GrammarExample {
  correct: string;
  incorrect: string;
  explanation: string;
}

export interface GrammarRuleTopic {
  id: string;
  ruleTitle: string;
  category: string; // e.g., 'Sentence Structure', 'Tenses', 'Workplace Diplomacy', 'Prepositions', 'Common Traps'
  formula: string;
  explanation: string;
  proFluencyTip: string;
  examples: GrammarExample[];
}

export const englishGrammarRulesData: GrammarRuleTopic[] = [
  // ================= 1. SENTENCE STRUCTURE & WORD ORDER =================
  {
    id: 'g-1',
    ruleTitle: 'Standard Spoken Word Order (S-V-O-M-P-T)',
    category: 'Sentence Structure',
    formula: 'Subject + Verb + Object + Manner + Place + Time',
    explanation: 'In English, word order is fixed. Manner (how), Place (where), and Time (when) always follow the main object at the end of a sentence.',
    proFluencyTip: 'Put time expressions ("yesterday", "at 5 PM", "next week") either at the very beginning or the very end of the sentence.',
    examples: [
      {
        correct: 'I sent the revised proposal to the client yesterday morning.',
        incorrect: 'I sent yesterday morning to the client the revised proposal.',
        explanation: 'Time ("yesterday morning") must go at the end after the object ("revised proposal").'
      },
      {
        correct: 'She explained the technical issue clearly in the meeting room.',
        incorrect: 'She explained clearly in the meeting room the technical issue.',
        explanation: 'Direct object ("the technical issue") comes immediately after the verb ("explained").'
      }
    ]
  },

  // ================= 2. WORKPLACE DIPLOMACY & SOFTENING =================
  {
    id: 'g-2',
    ruleTitle: 'Diplomatic Softening with Modal Verbs',
    category: 'Workplace Diplomacy',
    formula: 'Could / Would / Might + Please + Base Verb',
    explanation: 'Direct statements can sound aggressive or demanding in English. Use modal verbs to turn commands into polite professional requests.',
    proFluencyTip: 'Instead of saying "Give me the file", use "Could you please share the file when you have a moment?"',
    examples: [
      {
        correct: 'Could you please clarify the main priority for Q4?',
        incorrect: 'Tell me the main priority for Q4 right now.',
        explanation: '"Could you please..." creates a respectful professional tone.'
      },
      {
        correct: 'Would it be possible to reschedule our check-in to 3 PM?',
        incorrect: 'Change our check-in meeting to 3 PM.',
        explanation: '"Would it be possible..." shows flexibility and respects the listener’s schedule.'
      }
    ]
  },

  // ================= 3. TENSES FOR FLUENT SPEAKING =================
  {
    id: 'g-3',
    ruleTitle: 'Present Perfect vs. Past Simple',
    category: 'Tenses',
    formula: 'Have/Has + Past Participle (Unspecified Time) vs. Verb-ed (Specific Past Time)',
    explanation: 'Use Present Perfect when the exact time does not matter or the result impacts the present. Use Past Simple when a specific time is mentioned.',
    proFluencyTip: 'If your sentence includes "yesterday", "last week", or "in 2023", ALWAYS use Past Simple.',
    examples: [
      {
        correct: 'I have already submitted the financial report.',
        incorrect: 'I have submitted the financial report yesterday.',
        explanation: '"Yesterday" specifies past time, so use "I submitted yesterday".'
      },
      {
        correct: 'We launched the product feature last Tuesday.',
        incorrect: 'We have launched the product feature last Tuesday.',
        explanation: '"Last Tuesday" requires Past Simple ("launched").'
      }
    ]
  },

  // ================= 4. PREPOSITIONS OF TIME & PLACE =================
  {
    id: 'g-4',
    ruleTitle: 'The IN / ON / AT Golden Rule',
    category: 'Prepositions',
    formula: 'AT (Precise Time/Point) • ON (Days/Dates/Surfaces) • IN (Months/Years/Enclosed Spaces)',
    explanation: 'Prepositions signal specific time frames and spatial locations.',
    proFluencyTip: 'AT 9 AM (precise point), ON Monday (day), IN July (month/season/year).',
    examples: [
      {
        correct: 'Our team standup takes place at 9:30 AM on Mondays.',
        incorrect: 'Our team standup takes place in 9:30 AM in Mondays.',
        explanation: 'Use "at" for specific clock times and "on" for days of the week.'
      },
      {
        correct: 'The company was founded in 2018.',
        incorrect: 'The company was founded on 2018.',
        explanation: 'Use "in" for years and centuries.'
      }
    ]
  },

  // ================= 5. COMMON SPOKEN GRAMMAR TRAPS =================
  {
    id: 'g-5',
    ruleTitle: 'Subject-Verb Agreement with Collective Nouns',
    category: 'Common Traps',
    formula: 'Everyone / Someone / Each + Singular Verb (is / has / does)',
    explanation: 'Indefinite pronouns like "everyone", "somebody", and "each" are grammatically singular in English.',
    proFluencyTip: 'Always follow "everyone" with "is" or "has", never "are" or "have".',
    examples: [
      {
        correct: 'Everyone on the project team is ready for the presentation.',
        incorrect: 'Everyone on the project team are ready for the presentation.',
        explanation: '"Everyone" takes a singular verb ("is").'
      },
      {
        correct: 'Each of the options has its own pros and cons.',
        incorrect: 'Each of the options have its own pros and cons.',
        explanation: '"Each" refers to individual items one by one, requiring singular "has".'
      }
    ]
  }
];
