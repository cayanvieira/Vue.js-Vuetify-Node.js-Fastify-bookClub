async function routes(fastify, options) {

    fastify.post(
        "/login",
        {},
        async (request, reply) => {

            const { email } = request.body
            const { password } = request.body
            
            const auth = await fastify.knex("account")
                .select("user_id","name")
                .where({
                    email: email,
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