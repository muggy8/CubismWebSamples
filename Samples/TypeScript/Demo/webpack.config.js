
var path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  target: ['web', 'es5'],
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@framework': path.resolve(__dirname, '../../../Framework/src')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../../..'),
    watchContentBase: true,
    inline: true,
    hot: true,
    port: 5000,
    host: '0.0.0.0',
    compress: true,
    useLocalIp: true,
    writeToDisk: true
  },
  devtool: 'inline-source-map',
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src' ,"external-interface.js"),
        },
      ],
    }),
  ]
}
