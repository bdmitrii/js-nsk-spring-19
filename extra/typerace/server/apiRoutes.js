const koaRouter = require('koa-router');

const router = new koaRouter({
  prefix: '/api'
});

router.get('/test', async ctx => {
  ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
  console.log('test');
});

module.exports = router.routes();
