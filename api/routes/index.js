module.exports = (fastify) => {
    fastify.register(require('./account.js'))
    fastify.register(require('./auth.js'))
    fastify.register(require('./club.js'))
    fastify.register(require('./book.js'))
    fastify.register(require('./search.js'))
}
