const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const flash = require("connect-flash");

const { passport, attachUserToLocals } = require('./middleware/auth');
const Router = require('./routes/Router');

dotenv.config();

const app = express();

// === MIDDLEWARE SETUP ===
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(attachUserToLocals);

app.use(flash());
app.use((req, res, next) => {
  res.locals.errorMessages = req.flash("error");
  next();
});

// === ROUTES ===
app.use('/', Router);

// === 404 Handler ===
app.use((req, res) => {
  res.status(404).render('404');
});

// === SERVER START ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
