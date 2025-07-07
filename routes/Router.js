const express = require('express');
const router = express.Router();
const { passport, ensureAuthenticated } = require('../middleware/auth');
const authController = require('../controllers/authController');
const { validateSignup } = require('../validators/authValidator');
const messageController = require('../controllers/messageController');
const { getAllMessages } = require('../models/messageModel');


router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', authController.signupForm);

router.post('/signup', validateSignup, authController.signupSubmit);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}));


// Protected Routes
router.get('/home', ensureAuthenticated, async (req, res) => {
    try {
      const messages = await getAllMessages();
      res.render('home', { messages });
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to load messages.");
    }
});
  

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard');
});

router.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('profile');
});

router.post('/messages', ensureAuthenticated, messageController.postMessage);

router.post('/messages/:id/delete', ensureAuthenticated, messageController.deleteMessage);

//logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/login');
    });
});

module.exports = router;
