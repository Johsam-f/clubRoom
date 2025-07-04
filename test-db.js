const pool = require('./config/db');

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected:', res.rows[0]);
  } catch (err) {
    console.error('Database connection failed:', err);
  } finally {
    pool.end();
  }
})();