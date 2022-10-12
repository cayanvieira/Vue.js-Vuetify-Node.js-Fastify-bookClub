const bcrypt = require('bcrypt')
async function routes(fastify, options) {

    fastify.post(
        "/login",
        {},
        async (request, reply) => {

            const { email } = request.body
            const { password } = request.body


            const hash = await fastify.knex("account")
                .select('password')    
                .where({
                        email: email,                    
                    })
                .first()
                
            
           
            bcrypt.compare(password,hash.password, async(err, result)=>{
                if (result === true ){
                    const auth = await fastify.knex("account")
                    .select("id","name",'administer')
                    .where({
                        email: email,
                    })
                    .first()
                    .then(data => data)
                    
                    reply.send(auth)
                 }else{
                    return err
                }
                
                })
        },
    )
}

module.exports = routes