const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');
const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');
const speakingRoutes = require('./routes/speaking');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/speaking', speakingRoutes);

// Healthcheck & Neon DB status
app.get('/api/health', async (req, res) => {
  try {
    const dbRes = await db.query('SELECT NOW()');
    res.json({
      status: 'online',
      message: 'FluentAI Backend Server is running successfully',
      neonDbConnected: true,
      timestamp: dbRes.rows[0].now
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      neonDbConnected: false,
      error: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 FluentAI Backend API running on http://localhost:${PORT}`);
});
