async function routes (fastify, options) {

  fastify.post(
    "/account/register",
    {},
    async(request,reply) => {

     const {name} = request.body
     const {birthData} = request.body
     const {email} = request.body
     const {password} = request.body
        
    
     
     fastify.knex("account")
      .insert({
        name:name,
        birthData:birthData,        
        email:email,
        password:password
      })   
      .then(
        newAccount => reply.send(newAccount)
      )
    },  
  )
}
  
  module.exports = routes