async function routes(fastify, options) {

    fastify.post(
        "/login",
        (request,reply) => {
            const { email } = request.body
            const { password } = request.body
            return fastify.service.Auth.login(email,password,reply)
        },
    )
}

module.exports = routes