var webpack = require('webpack')
var poststylus = require('poststylus')

module.exports = {
  entry: './js/app.js',
  output: {
    path: './dist',
    publicPath: 'dist/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test:   /\.styl$/,
        loader: "style-loader!css-loader!stylus-loader"
      },
      {
        test:   /\.jade$/,
        loader: "template-html-loader"
      }
    ]
  },
  use: [
    poststylus([ 'autoprefixer'])
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
}
