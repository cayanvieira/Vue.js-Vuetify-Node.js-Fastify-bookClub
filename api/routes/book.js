async function routes(fastify, options) {
    
    fastify.post(
        '/register',
        async(request,reply) =>{

            const {name} = request.body
            const {edition} = request.body
            const {genre} = request.body
            const {author} = request.body
            const {code} = request.body
            
            fastify.knex("book")
                .insert({
                    name:name,
                    edition: edition,        
                    genre:genre,
                    author:author,
                    code:code
                })   
            .then(
                newRegister => reply.send(newRegister)
            )
        },
    )

    fastify.put(
        '/:id/update',
        async(request, reply) => {
            const {id} = request.params
            const {name} = request.body
            const {edition} = request.body
            const {genre} = request.body
            const {author} = request.body
            const {code} = request.body
            fastify.knex("book")
                .where('id', id)
                .update({
                    name: name,
                    edition: edition,
                    genre: genre,
                    author: author,
                    code: code 
                }).then(data => {
                    if(!data === 1){
                        const result = "erro"
                    }
                    const result = "alterado"
                    reply.send(result)
                })
        }
    )

    fastify.delete(
        '/:id/delete',
        async(request, reply) => {
            const {id} = request.params

            fastify.knex("book")
                .where('id', id)
                .del()
                .then(data => reply.send(data));
        }
    )
    
    fastify.get(
        '/list',
        async(request, reply) => {
            const {id} = request.params

            fastify.knex("book")
                .select('*')
                .then(data => reply.send(data));
        }
    )

    fastify.get(
        '/:id',
        async(request, reply) => {
            const {id} = request.params

            fastify.knex("book")
                .select('*')
                .where('id',id)
                .first()
                .then(data => reply.send(data));
            
        }
    )

    fastify.get(
        "/new_books",
        async (request, reply) => {
    
          fastify.knex("book")
            .select('*')
            .orderBy('id', 'desc')
            .then(data => reply.send(data.slice(0,10)))
        }
      )

}
module.exports = routes