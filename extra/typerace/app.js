const koa = require('koa');
const koaLogger = require('koa-logger');
const koaViews = require('koa-views');
const koaStatic = require('koa-static');
const koaBody = require('koa-body');

const passport = require('koa-passport');

const { Strategy } = require('passport-jwt');

const path = require('path');
const jwtSecret = require('./server/keys');

const apiRoutes = require('./server/apiRoutes');
const viewsRoutes = require('./server/viewsRoutes');

const views = koaViews(path.join(__dirname, '/client/dist/views'), {
  map: { html: 'mustache' },
  options: {
    partials: {
      header: 'header',
      footer: 'footer'
    }
  }
});

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

const app = new koa();

app.use(koaLogger());
app.use(koaStatic('./extra/typerace/client/dist'));
app.use(views);
app.use(koaBody());

app.use(passport.initialize());

passport.use(new Strategy(opts, (jwtPayload, done) => done(null, jwtPayload)));
// require('./server/passport')(passport);

app.use(apiRoutes);
app.use(viewsRoutes);

app.listen(4000, () => 'СЛУШАЕМ ПОРТ 4000');
