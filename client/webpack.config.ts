const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: path.resolve(__dirname, 'public', 'index.html'),
});

const cssPlugin = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css',
});

const clearPlugin = new CleanWebpackPlugin();

module.exports = {
  entry: {
    app: ['./src/index.tsx'],
    vendor: ['react', 'react-dom']
},
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [htmlPlugin, cssPlugin, clearPlugin],
};
