const pool = require('../config/db');

const createUser = async ({ firstName, lastName, email, passwordHash }) => {
  const result = await pool.query(
    `INSERT INTO users (first_name, last_name, email, password_hash)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [firstName, lastName, email, passwordHash]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};

const updateUserInfo = async (currentEmail, { first_name, last_name, email }) => {
  const result = await pool.query(
    `UPDATE users 
     SET first_name = $1, last_name = $2, email = $3
     WHERE email = $4
     RETURNING *`,
    [first_name, last_name, email, currentEmail]
  );
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  updateUserInfo
};
