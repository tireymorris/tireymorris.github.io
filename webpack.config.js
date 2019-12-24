const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    port: 3000,
    open: false,
    contentBase: path.join(__dirname, 'docs'),
    watchContentBase: true,
    historyApiFallback: true,
    disableHostCheck: true,
    stats: 'errors-only',
    overlay: true,
    hotOnly: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.md$/,
        use: 'raw-loader'
      },
      {
        test: /\.(jpg|png)$/,
        use: 'file-loader?name=assets/img/[name].[ext]'
      },
      {
        test: /\.html$/,
        use: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.md']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs')
  },
  plugins: [new webpack.EnvironmentPlugin({ ...process.env })]
};
