const express = require('express');
const router = express.Router();
const db = require('../db');

// Get User Progress & Stats
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await db.query('SELECT * FROM user_progress WHERE user_id = $1', [userId]);
    
    if (progress.rows.length === 0) {
      return res.status(404).json({ error: 'Progress not found' });
    }

    const history = await db.query(
      'SELECT * FROM spoken_history WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20',
      [userId]
    );

    res.json({
      progress: progress.rows[0],
      history: history.rows
    });
  } catch (error) {
    console.error('Fetch progress error:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// Update Lesson Completion & XP
router.post('/complete-lesson', async (req, res) => {
  try {
    const { userId, lessonId, xpEarned, phase } = req.body;
    
    const progressResult = await db.query('SELECT * FROM user_progress WHERE user_id = $1', [userId]);
    let progress = progressResult.rows[0];

    if (!progress) {
      const newProgress = await db.query(
        'INSERT INTO user_progress (user_id, current_phase, xp_points, completed_lessons) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId, phase || 'basics', xpEarned || 20, JSON.stringify([lessonId])]
      );
      return res.json({ message: 'Lesson completed', progress: newProgress.rows[0] });
    }

    const completed = Array.isArray(progress.completed_lessons) ? progress.completed_lessons : [];
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
    }

    const newXP = (progress.xp_points || 0) + (xpEarned || 20);

    const updated = await db.query(
      'UPDATE user_progress SET xp_points = $1, completed_lessons = $2, current_phase = COALESCE($3, current_phase), updated_at = CURRENT_TIMESTAMP WHERE user_id = $4 RETURNING *',
      [newXP, JSON.stringify(completed), phase, userId]
    );

    res.json({
      message: 'Lesson recorded in Neon DB',
      progress: updated.rows[0]
    });
  } catch (error) {
    console.error('Complete lesson error:', error);
    res.status(500).json({ error: 'Error recording lesson completion' });
  }
});

module.exports = router;
