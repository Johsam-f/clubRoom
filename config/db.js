const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false, // Set to { rejectUnauthorized: false } if you're connecting to a cloud DB with SSL
});

module.exports = pool;
