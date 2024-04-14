const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  externals: [nodeExternals()],
  externalsPresets: { node: true },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.dist'),
    filename: '[name].js',
  },
  plugins: [
    new NodemonPlugin({
      // If using more than one entry, you can specify
      // which output file will be restarted.
      script: './dist/main.js',
    
      // What to watch.
      watch: path.resolve('./dist'),
    
      // Arguments to pass to the script being watched.
      args: ['demo'],
    
      // Node arguments.
      nodeArgs: ['--debug=9222'],
    
      // Files to ignore.
      ignore: ['*.js.map'],
    
      // Extensions to watch.
      ext: 'js,njk,json',
    
      // Unlike the cli option, delay here is in milliseconds (also note that it's a string).
      // Here's 1 second delay:
      delay: '1000',
    
      // Detailed log.
      verbose: true,
    
      // Environment variables to pass to the script to be restarted
      env: {
        NODE_ENV: 'development',
      },
    })
  ],
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'ts-loader',
      }
    ],
  },
  optimization: {
    minimize: false,
    nodeEnv: false,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
  },
};
