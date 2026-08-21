-- Neon DB Database Schema for FluentAI English Learning App

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phase VARCHAR(50) DEFAULT 'basics', -- 'basics', 'intermediate', 'advanced'
    daily_goal INTEGER DEFAULT 15,     -- minutes per day
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    current_phase VARCHAR(50) DEFAULT 'basics',
    xp_points INTEGER DEFAULT 0,
    streak_days INTEGER DEFAULT 1,
    last_active_date DATE DEFAULT CURRENT_DATE,
    completed_lessons JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS spoken_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    phrase_text TEXT NOT NULL,
    user_transcription TEXT,
    accuracy_score INTEGER NOT NULL, -- 0 to 100
    phase VARCHAR(50) NOT NULL,      -- 'basics', 'intermediate', 'advanced', 'business'
    feedback_details JSONB,         -- word level scores
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookmarked_vocab (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    word VARCHAR(100) NOT NULL,
    phonetic VARCHAR(100),
    definition TEXT NOT NULL,
    example_sentence TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
