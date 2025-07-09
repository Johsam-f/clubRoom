const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Set up the Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }

      const match = await bcrypt.compare(password, user.password_hash)
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.email); // You can change this to user.id if 
});

passport.deserializeUser(async (email, done) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Middleware to expose user to views
const attachUserToLocals = (req, res, next) => {
  res.locals.currentUser = req.user;
  next();
};

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
  };
  
  module.exports = {
    passport,
    attachUserToLocals,
    ensureAuthenticated,
  };
  
