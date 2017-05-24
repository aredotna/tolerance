const Arena = require('./services/arena');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
  passport.serializeUser(({ token }, done) => {
    Arena.get('accounts', {}, { 'X-AUTH-TOKEN': token })
      .then(user => done(null, user))
      .catch(done);
  });

  passport.deserializeUser(({ user }, done) => {
    done(null, user);
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
  }, (req, email, password, done) => {
    Arena.post('tokens', { email, password })
      .then(json => done(null, json))
      .catch(done);
  }));
};
