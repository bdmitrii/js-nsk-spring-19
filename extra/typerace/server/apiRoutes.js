const koaRouter = require('koa-router');
const jwt = require('jsonwebtoken');

const { validateRegistration } = require('./validation');
const User = require('./models/user');
const Stat = require('./models/stat');

const router = new koaRouter({
  prefix: '/api'
});

router
  .get('/test', async ctx => {
    ctx.body = `Request Body ${1}`;
  })

  .post('/registration', async(ctx, next) => {
    const { login, password, password2 } = ctx.request.body;

    const error = validateRegistration(login, password, password2);

    if (!error) {
      await User.create(login, password);
      ctx.redirect('/login');
      ctx.status = 200;
    }
  })
  .patch('/stat', async(ctx, next) => {
    const { newSpeed } = ctx.request.body;

    const token = ctx.cookies.get('token');
    const { userId } = jwt.decode(token);

    await Stat.add(newSpeed, userId);

    ctx.body = {
      newSpeed
    };

    ctx.status = 200;
  });

module.exports = router.routes();
