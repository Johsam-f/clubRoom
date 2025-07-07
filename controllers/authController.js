const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { createUser } = require('../models/userModel');

exports.signupForm = (req, res) => {
  res.render('signup', { errors: [], formData: {} });
};

exports.signupSubmit = async (req, res) => {
  const errors = validationResult(req);

  const { first_name, last_name, email, password } = req.body;

  if (!errors.isEmpty()) {
    // Re-render form with validation errors + previous input
    return res.render('signup', {
      errors: errors.array(),
      formData: { first_name, last_name, email }
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser({
      firstName: first_name,
      lastName: last_name,
      email,
      passwordHash: hashedPassword
    });

    // Optional: Flash message like "Signup successful! Please log in."
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
};


