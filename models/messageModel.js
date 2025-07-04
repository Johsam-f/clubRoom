const pool = require('../config/db');

const createMessage = async ({ title, text, authorId }) => {
  const result = await pool.query(
    `INSERT INTO messages (title, text, author_id)
     VALUES ($1, $2, $3) RETURNING *`,
    [title, text, authorId]
  );
  return result.rows[0];
};

const getAllMessages = async () => {
  const result = await pool.query(
    `SELECT messages.*, users.first_name, users.last_name
     FROM messages
     JOIN users ON messages.author_id = users.id
     ORDER BY created_at DESC`
  );
  return result.rows;
};

module.exports = {
  createMessage,
  getAllMessages
};
