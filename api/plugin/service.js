const Service =  require('../service/')

module.exports = (fastify) => {
    fastify.decorate('service', new Service())
}
