const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    front: './src/app.ts',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.eot$|\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              regExp: /(\\src\\)(\S+)(\\\S+\.\S+)/,
              name: '[2]/[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              regExp: /(\\src\\)(\S+)(\\\S+\.\S+)/,
              name: '[2]/[name].[ext]',
              bypassOnDebug: true,
              disable: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: './src/sprites/',
        to: 'sprites/',
      },
      {
        from: './src/sounds/',
        to: 'sounds/',
      },
    ]),
  ],
};
