async function routes (fastify, options) {

    fastify.post(
      "/club/create",
      {},
      async(request,reply) => {
  
       const {name} = request.body
       const {dateCreate} = request.body
       const {owner} = request.body
       const {groupLimit} = request.body
       const {actualBook} = request.body
      
       
       fastify.knex("club")
        .insert({
          name:name,
          date_create:dateCreate,        
          owner:owner,
          group_limit:groupLimit,
          actual_book:actualBook
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
  }
    
    module.exports = routes