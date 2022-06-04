async function routes (fastify, options) {

  fastify.post(
    "/account/register",
    {},
    async(request,reply) => {

      const {name} = request.body
      const {birthData} = request.body
      const {email} = request.body
      const {password} = request.body
      const {sex} = request.body
      const {uf} = request.body
        
    
     
      try {fastify.knex("account")
        .insert({
          name:name,
          birthData:birthData,        
          email:email,
          password:password,
          sex:sex,
          uf:uf,
          administer:false  
        })   
        .then(
          newAccount => reply.send(newAccount)
        )
      }
      catch{
        console.log('Erro ao cadastrar')
      }  
    },  
  )
}
  
  module.exports = routes