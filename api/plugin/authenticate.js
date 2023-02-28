// const jwt = require('jsonwebtoken')


// module.exports = (fastify)=>{
//     fastify.decorate("authenticate",(request,reply,next)=>{
//         const authHeader = request.headers['authorization']
//         let token = null
        
//         if(authHeader){
//             token = authHeader.split(' ')[1]
//         }
        
//         if(!token){
//             return reply.code(401).send({message:'Access deny'})
//         }

//         try {
//             const secret = process.env.JWT_SECRET
            
//             jwt.verify(token,secret)
            
//             next()

//         } catch (error) {
//             return reply.code(400).send({message:'Token Invalido!'})
//         }
//     })
// }