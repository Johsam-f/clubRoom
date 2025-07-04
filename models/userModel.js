const pool = require('../config/db');

const createUser = async ({ firstName, lastName, username, passwordHash }) => {
  const result = await pool.query(
    `INSERT INTO users (first_name, last_name, username, password_hash)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [firstName, lastName, username, passwordHash]
  );
  return result.rows[0];
};

const findUserByUsername = async (username) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE username = $1`,
    [username]
  );
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByUsername
};
