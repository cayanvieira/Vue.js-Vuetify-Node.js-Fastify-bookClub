module.exports = (fastify) => {
    fastify.register(require('./account.js'),{ prefix: '/account' })
    fastify.register(require('./auth.js'),{ prefix: '/auth' })
    fastify.register(require('./club.js'),{ prefix: '/club' })
    fastify.register(require('./book.js'),{ prefix: '/book' })
    fastify.register(require('./search.js'),{ prefix: '/search' })
}
