const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.tsx',
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
      },
      {
        test: /\.pdf$/,
        use: 'file-loader?name=assets/[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.md']
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs')
  },
  plugins: [new webpack.EnvironmentPlugin({ ...process.env })]
};
