const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
    contentBase: path.join(__dirname, 'dist'),
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
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
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
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.md']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [new webpack.EnvironmentPlugin({ ...process.env })]
};
