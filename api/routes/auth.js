async function routes(fastify, options) {

    fastify.post(
        "/signin",
        (request,reply) => {            
            const { email } = request.body
            const { password } = request.body
            return fastify.service.Auth.signIn(email,password,reply)
        },
    )
}

module.exports = routes