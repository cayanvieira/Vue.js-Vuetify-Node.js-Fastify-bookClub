
const fastify = require('fastify')({ logger: true })
require('dotenv').config()

//Banco de dados
require('./database/dbConnector')(fastify)

//cors
fastify.register(require("fastify-cors"),{origin:"*"})

//Rotas
require('./routes/index.js')(fastify)

//plugins
require('./plugin/service')(fastify)


fastify.get( '/', async(request,reply) => {
   reply.send('Servidor Ligado')
})

const start = async () => {
  try {
    await fastify.listen({port:process.env.PORT,host:'0.0.0.0'})
    console.log("Sucess Server On")    
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()