async function routes(fastify,options){

    fastify.get(
        '/search/:type/:word',
        async(request)=>{
    
          const {word}=request.params
          let {type}=request.params
          
    
          if(type === "Livros"){
            const result = fastify.knex("book")
            .select('id','name')        
            .where('name','ilike', `%${word}%`) 
            return result
          }
          else if(type === "Usuários"){
    
            const result = fastify.knex('account')
            .select('id','name')        
            .where('name','ilike', `%${word}%`) 
            return result
          }
          else{
            const result = fastify.knex('club')
            .select('id','name')        
            .where('name','ilike', `%${word}%`) 
            return result
          }
          
        }
    )
}

module.exports = routes