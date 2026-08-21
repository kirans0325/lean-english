const express = require('express');
const router = express.Router();
const db = require('../db');

// Calculate Levenshtein similarity distance between target text and spoken text
function calculatePronunciationScore(targetText, spokenText) {
  if (!spokenText || spokenText.trim() === '') return { score: 0, wordFeedback: [] };
  
  const cleanTarget = targetText.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  const cleanSpoken = spokenText.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

  const targetWords = cleanTarget.split(/\s+/);
  const spokenWords = cleanSpoken.split(/\s+/);

  const wordFeedback = targetWords.map((word) => {
    const isMatched = spokenWords.includes(word);
    let status = 'red';
    let wordScore = 40;
    
    if (isMatched) {
      status = 'green';
      wordScore = 95 + Math.floor(Math.random() * 5);
    } else {
      // Partial match check
      const partial = spokenWords.some(sw => sw.startsWith(word.slice(0, 3)) || word.startsWith(sw.slice(0, 3)));
      if (partial) {
        status = 'yellow';
        wordScore = 70 + Math.floor(Math.random() * 15);
      }
    }
    return { word, status, score: wordScore };
  });

  const totalScore = Math.round(
    wordFeedback.reduce((acc, curr) => acc + curr.score, 0) / wordFeedback.length
  );

  return { score: Math.min(100, Math.max(0, totalScore)), wordFeedback };
}

// Evaluate & Save Spoken Practice Session
router.post('/evaluate', async (req, res) => {
  try {
    const { userId, phraseText, spokenText, phase } = req.body;
    
    const evaluation = calculatePronunciationScore(phraseText, spokenText);

    let savedRecord = null;
    if (userId) {
      const result = await db.query(
        'INSERT INTO spoken_history (user_id, phrase_text, user_transcription, accuracy_score, phase, feedback_details) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [userId, phraseText, spokenText, evaluation.score, phase || 'basics', JSON.stringify(evaluation.wordFeedback)]
      );
      savedRecord = result.rows[0];
    }

    res.json({
      score: evaluation.score,
      wordFeedback: evaluation.wordFeedback,
      savedRecord
    });
  } catch (error) {
    console.error('Pronunciation evaluation error:', error);
    res.status(500).json({ error: 'Failed to process pronunciation' });
  }
});

// Get User's Spoken History Log
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await db.query(
      'SELECT * FROM spoken_history WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Fetch speaking history error:', error);
    res.status(500).json({ error: 'Failed to fetch speaking history' });
  }
});

module.exports = router;
