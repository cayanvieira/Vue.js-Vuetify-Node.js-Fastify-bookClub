module.exports = (fastify) => {

    fastify.decorate(
      "knex",
     require('./client')
    )
  
  }