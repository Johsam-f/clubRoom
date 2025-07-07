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
  




// const express = require('express');
// const { body } = require('express-validator');
// const authController = require('../controllers/authController');
// const { findUserByUsername } = require('../models/userModel');

// const router = express.Router();

// // Signup Route (GET: form + POST: process form)
// router.get('/signup', authController.signupForm);

// router.post(
//   '/signup',
//   [
//     body('first_name')
//       .trim()
//       .notEmpty().withMessage('First name is required'),
//     body('last_name')
//       .trim()
//       .notEmpty().withMessage('Last name is required'),
//     body('email')
//       .trim()
//       .isEmail().withMessage('Enter a valid email')
//       .custom(async (value) => {
//         const user = await findUserByEmail(value);
//         if (user) {
//           throw new Error('Email already in use');
//         }
//         return true;
//       }),
//     body('password')
//       .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
//     body('confirmPassword')
//       .custom((value, { req }) => {
//         if (value !== req.body.password) {
//           throw new Error('Passwords do not match');
//         }
//         return true;
//       }),
//   ],
//   authController.signupSubmit
// );

// module.exports = router;
