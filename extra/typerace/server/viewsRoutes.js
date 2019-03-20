const koaRouter = require('koa-router');

const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const Stat = require('./models/stat');

const router = new koaRouter();

const jwtSecret = require('./keys');

router
  .get('/', passport.authenticate('jwt', { session: false, failureRedirect: '/login' }), indexPage)
  .get('/login', loginPage)
  .post('/login', loginPage)
  .get('/registration', registrationPage)
  .get('/logout', async ctx => {
    ctx.cookies.set('token');
    await loginPage(ctx);
  })
  .get('/profile', profilePage)
  .get('/rating', ratingPage);

async function ratingPage(ctx) {
  const isLogin = Boolean(ctx.cookies.get('token'));

  const top10 = await Stat.getLast(10);

  const ratingList = await Promise.all(
    top10.map(async(rec, index) => {
      const { userId } = rec;
      const user = await User.get(null, null, userId);

      const { login: name } = user;
      const { speed } = rec;

      return { index: index + 1, name, speed };
    })
  ).then(list => list);

  await ctx.render('rating', { isLogin, ratingList });
}

async function profilePage(ctx) {
  const isLogin = Boolean(ctx.cookies.get('token'));

  const token = ctx.cookies.get('token');

  const { userId, login: name } = jwt.decode(token);
  const { speed: bestResult } = (await Stat.getBestByUser(userId))[0];

  await ctx.render('profile', { isLogin, profileInfo: { bestResult, name } });
}

async function loginPage(ctx) {
  const { login, password } = ctx.request.body;

  if (ctx.method === 'POST') {
    const { _id: userId } = await User.get(login, password);

    if (userId) {
      jwt.sign({ userId, login, password }, jwtSecret, { expiresIn: 3600 }, (err, token) => {
        ctx.cookies.set('token', `${token}`);
      });
    }
  }
  await ctx.render('login');
}

async function indexPage(ctx) {
  const isLogin = Boolean(ctx.cookies.get('token'));

  await ctx.render('index', { isLogin });
}

async function registrationPage(ctx) {
  await ctx.render('registration');
}

module.exports = router.routes();
