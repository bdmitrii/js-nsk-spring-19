const koa = require('koa');
const koaLogger = require('koa-logger');
const koaViews = require('koa-views');
const koaStatic = require('koa-static');
const koaBody = require('koa-body');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');

const passport = require('koa-passport');
const { JwtStratagy, ExtractJwt } = require('passport-jwt');

const jwt = require('jsonwebtoken');

const webpack = require('webpack');
const path = require('path');
const jwtSecret = require('./server/keys');
const config = require('../../webpack.config');

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

const app = new koa();

const compile = webpack(config);

app.use(koaLogger());
app.use(koaStatic('/'));
app.use(devMiddleware(compile), {
  publicPath: '/'
});
app.use(hotMiddleware(compile));
app.use(views);
app.use(koaBody());
app.use(apiRoutes);
app.use(viewsRoutes);

app.listen(3000, () => console.log(path.resolve(__dirname)));
