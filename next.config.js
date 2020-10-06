const withPlugins = require('next-compose-plugins')

module.exports = withPlugins([
  require('next-images'),
  require('next-transpile-modules')([
    'react-mapbox-gl',
    'mapbox-gl',
  ])], {
    poweredByHeader: false,
    compress: true,
    devIndicators: {
      autoPrerender: false,
    },
  })
