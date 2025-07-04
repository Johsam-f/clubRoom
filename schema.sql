-- for development only
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;

-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  is_member BOOLEAN DEFAULT false,
  is_admin BOOLEAN DEFAULT false
);

-- Messages Table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
