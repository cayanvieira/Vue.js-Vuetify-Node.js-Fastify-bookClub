async function routes (fastify, options) {

  fastify.post(
    "/club/create",
    {},
    async(request,reply) => {

      const {name} = request.body      
      const {owner} = request.body
      const {groupLimit} = request.body
      const {actualBook} = request.body
      const {password} = request.body
    
      
      fastify.knex("club")
        .insert({
          name:name,              
          owner:owner,
          group_limit:groupLimit,
          actual_book:actualBook,
          password:password
        })   
      .then(
        newClub => reply.send(newClub)
      )
    },  
  )

  fastify.get(
    "/club",
    async(request,reply)=>{
      fastify.knex("club")
        .select('*')                   
        .then(data=>reply.send(data))
    }
  )

  fastify.get(
    "/club/:id",
    async(request,reply)=>{

      const {id} = request.params
      fastify.knex("club")
        .select('*')
        .where('id',id)
        .first()                 
        .then(data=>reply.send(data))
    }
  )

  fastify.get(
    "/newclubs",
    async(request,reply)=>{
      
      fastify.knex("club")
        .select('*')
        .orderBy('id','desc')         
        .then(data=>reply.send(data.slice(0,5)))
    }
  )

  fastify.post(
    "/club/login",
    {},
    async (request, reply) => {

      const { clubId } = request.body
      const { password } = request.body
      
      const auth = await fastify.knex("club")
          .select("club.id")
          .where({
              id:clubId,
              password: password
          })
          .first()
      if(auth){
          reply.send(auth)
      }
      else{
          return null
      }
        
    },
)
}
    
module.exports = routes