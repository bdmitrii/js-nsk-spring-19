const koaRouter = require('koa-router');

const User = require('./models/user');
const { validateRegistration } = require('./validation');

const router = new koaRouter();

const jwtSecret = require('./keys');

const passport = require('koa-passport');
const { JwtStratagy, ExtractJwt } = require('passport-jwt');

const jwt = require('jsonwebtoken');

router
  .get('/', mainPage)
  .get('/login', loginPage)
  .get('/registration', registrationPage)
  .post('/registration', registrationPage);

async function mainPage(ctx) {
  await ctx.render('index', {
    title: 'TypeRace'
  });
}

async function loginPage(ctx) {
  await ctx.render('login', {});
}

async function registrationPage(ctx) {
  const { login, password, password2 } = ctx.request.body;

  let error;

  if (ctx.method === 'POST') {
    error = validateRegistration(login, password, password2);

    if (!error) {
      const id = await User.create(login, password);

      console.log(id);
      jwt.sign({ id, login, password }, jwtSecret, { expiresIn: 3600 }, (err, token) => {});

      ctx.redirect('/');
    }
  }

  await ctx.render('registration');
}

module.exports = router.routes();
