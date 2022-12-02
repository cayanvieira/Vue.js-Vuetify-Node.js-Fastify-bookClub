
const fastify = require('fastify')({ logger: true })
require('dotenv').config()

//Banco de dados
require('./database/dbConnector')(fastify)

//cors
fastify.register(require("fastify-cors"),{origin:"*"})

//Rotas
fastify.register(require('./routes/account.js'))
fastify.register(require('./routes/auth.js'))
fastify.register(require('./routes/club.js'))
fastify.register(require('./routes/book.js'))
fastify.register(require('./routes/search.js'))

fastify.get( '/', async(reply)=>{
 reply.send('Servidor Ligado')
})

const start = async () => {
  try {
    await fastify.listen(3000)
    console.log("Sucess Server On")    
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()