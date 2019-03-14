const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const typeracePath = path.join(__dirname, 'extra', 'typerace', 'client');
const viewsPath = path.resolve(typeracePath, 'src', 'views');

module.exports = {
  entry: {
    app: ['@babel/polyfill', path.resolve(typeracePath, 'src', 'index.js')],
    login: path.resolve(typeracePath, 'src', 'login'),
    registration: path.resolve(typeracePath, 'src', 'registration')
  },
  output: {
    filename: 'bundle.[name].js',
    path: path.resolve(typeracePath, 'dist')
  },
  devServer: {
    contentBase: path.resolve(typeracePath, 'dist'),
    port: 9000
  },
  mode: 'production',
  watch: true,
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['ie >= 8', 'last 5 versions']
                })
              ]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(viewsPath, 'header.html'),
      filename: 'views/header.html',
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(viewsPath, 'footer.html'),
      filename: 'views/footer.html',
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(viewsPath, 'index.html'),
      filename: 'views/index.html',
      inject: 'body',
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(viewsPath, 'login.html'),
      filename: 'views/login.html',
      inject: 'body',
      chunks: ['login']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(viewsPath, 'registration.html'),
      filename: 'views/registration.html',
      inject: 'body',
      chunks: ['registration']
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(viewsPath, 'rating.html'),
    //   filename: 'views/rating.html',
    //   inject: false
    // }),
    new MiniCssExtractPlugin({
      filename: 'styles/styles.css'
    })
  ]
};
