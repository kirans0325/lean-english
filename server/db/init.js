const fs = require('fs');
const path = require('path');
const db = require('./index');

async function initDatabase() {
  try {
    console.log('Initializing Neon PostgreSQL database tables...');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');
    
    await db.query(sql);
    console.log('✅ Neon DB tables initialized successfully!');
  } catch (error) {
    console.error('❌ Failed to initialize Neon DB:', error.message);
  } finally {
    process.exit(0);
  }
}

initDatabase();
