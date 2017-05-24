const express = require('express');
const Next = require('next');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const dev = process.env.NODE_ENV !== 'production';
const app = Next({ dev });
const handle = app.getRequestHandler();

require('./auth')(passport);

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(cookieParser());
    server.use(session({
      secret: 'secret',
      key: 'arena.session',
      resave: true,
      saveUninitialized: true,
      cookie: {
        secure: 'auto',
        maxAge: 31536000000,
      },
    }));
    server.use(passport.initialize());
    server.use(passport.session());

    server.post('/login', passport.authenticate('local'), (req, res) => {
      res.cookie('token', req.user.token);
      res.redirect('/');
    });

    server.get('/logout', (req, res) => {
      req.logout();
      req.session.destroy();
      res.clearCookie('token');
      res.redirect('/');
    });

    server.get('*', (req, res) => {
      handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on port 3000');
    });
  });
