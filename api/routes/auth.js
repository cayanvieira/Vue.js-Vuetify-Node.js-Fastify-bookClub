async function routes(fastify, options) {

    fastify.post(
        "/login",
        (request) => {
            const { email } = request.body
            const { password } = request.body
            return fastify.service.Auth.login(email,password)
        },
    )
}

module.exports = routes