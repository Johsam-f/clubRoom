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
  const result = await pool.query(`
    SELECT 
      messages.id, 
      messages.title, 
      messages.text, 
      messages.created_at, 
      users.first_name || ' ' || users.last_name AS author_name
    FROM messages
    LEFT JOIN users ON messages.author_id = users.id
    ORDER BY messages.created_at DESC
  `);
  return result.rows;
};


const deleteMessage = async (id) => {
  await pool.query(`DELETE FROM messages WHERE id = $1`, [id]);
};


module.exports = {
  createMessage,
  getAllMessages,
  deleteMessage
};
