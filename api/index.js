const { createRequestHandler } = require('@remix-run/vercel')

module.exports = createRequestHandler({
  // eslint-disable-next-line global-require
  build: require('./_build'),
})
