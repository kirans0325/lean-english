const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_OC1VbURlm7SH@ep-broad-haze-axdzb9ja-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on('connect', () => {
  console.log('Connected to Neon PostgreSQL Database successfully.');
});

pool.on('error', (err) => {
  console.error('Unexpected database error on Neon DB pool:', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
