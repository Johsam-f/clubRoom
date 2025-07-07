const express = require('express');
const router = express.Router();
const { passport, ensureAuthenticated } = require('../middleware/auth');
const authController = require('../controllers/authController');
const { validateSignup } = require('../validators/authValidator');
const { updateUserInfo } = require('../models/userModel');

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', authController.signupForm);

router.post('/signup', validateSignup, authController.signupSubmit);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));

// Protected Routes
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard');
});

router.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('profile');
});

router.get('/settings', ensureAuthenticated, (req, res) => {
    res.render('settings');
});

router.post('/settings', ensureAuthenticated, async (req, res) => {
    const { first_name, last_name, email } = req.body;

    try {
        await updateUserInfo(req.user.email, { first_name, last_name, email });

        // Update session info
        req.user.first_name = first_name;
        req.user.last_name = last_name;
        req.user.email = email;

        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong while updating your profile.");
    }
});

//logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/login');
    });
});

module.exports = router;
