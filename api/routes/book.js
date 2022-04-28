async function routes(fastify, options) {
    
    fastify.post(
        '/book/register',
        async(request,reply) =>{

            const {name} = request.body
            const {edition} = request.body
            const {genre} = request.body
            const {author} = request.body
            const {code} = request.body
            
            fastify.knex("books")
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
}
module.exports = routes