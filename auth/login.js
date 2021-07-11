var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const userService = require('./service/userService');

/* GET login page. */
router.get('/login', async function (req, res, next) {
  if(req.isAuthenticated()) {
    res.redirect('/');
  }
  res.render('login');
});

passport.use(new LocalStrategy(
  async function (username, password, done) {
    const user = await userService.findOne(username);
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  const user = await userService.findById(id);
  done(null, user);
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.get('/logout', function(req, res, next) {
  req.logOut();
  console.log('Logged out');
  res.redirect('/');
})

module.exports = router;