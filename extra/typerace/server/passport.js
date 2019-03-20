const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('./models/user');
const jwtSecret = require('./keys');

const cookieExtractor = req => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies.get('token');
  }

  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: jwtSecret
};

module.exports = passport => {
  passport.use(
    new Strategy(opts, (jwtPayload, done) => done(null, jwtPayload))
  );
};
