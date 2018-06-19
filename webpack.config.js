module.exports = {
  entry: {
    index: __dirname + '/src/index.ts',
    sw: __dirname + '/src/sw/sw.ts'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/tmp'
  },
  module: {
    loaders: [
      {
        test: /.(ts)$/,
        loaders: ['ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: ['src'],
    extensions: ['.ts']
  }
}
