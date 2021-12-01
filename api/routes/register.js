async function routes (fastify, options) {
  
 

  fastify.get('/register/accounts', async(request,reply)=>{
   
    fastify.knex("users")
    .then(
      accounts=> reply.send(accounts)
    )
   
  })

  
  fastify.get('/register/login', async(request,reply)=>{
    
    const seunumero=2

    fastify.knex("users")
    .where("account_id",seunumero)
    
    .then(
      accounts=> reply.send(accounts)
    )
   
  })

  fastify.post(
    "/register/create",
    {},
    async(request,reply) => {

     const {name} = request.body
     const {lastName} = request.body
     const {document} = request.body
     const {registration} = request.body
     const {email} = request.body     
    
     
     fastify.knex("users")
      .insert({
        name:name,
        lastName:lastName,
        document:document,
        registration:registration,
        email:email})   
      .then(
        newAccount => reply.send(newAccount)
      )
    },

    fastify.delete(
      "/register/delete",     
      async(request, reply) => {
        
        const {user_id} = request.body

        fastify.knex("users")
        .where('user_id',user_id)
        .del()
        .then((data)=>reply.send(data))

        
      }
    )
  )
  


}
  
  module.exports = routes