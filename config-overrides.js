const {
  getBabelLoader,
} = require('react-app-rewired')

module.exports = (config) => {
  const babelLoader = getBabelLoader(config.module.rules)
  if(!babelLoader) throw new Error('Babel config bug')
  babelLoader.options.babelrc = true
  return config
}