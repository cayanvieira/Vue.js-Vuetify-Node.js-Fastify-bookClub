const bcrypt = require('bcrypt')
const knex = require('../database/client')
const jwt = require('jsonwebtoken')

module.exports = class Service{
    async signIn(email,password,reply){

        if(!email){
            return reply.code(422).send({message:" Campo e-mail vazio"})
        }
        if(!password){
            return reply.code(422).send({message:" Campo senha vazio"})
        }
       
        const hash = await knex("account")
            .select('password')              
            .where('email',email)
            .first()

        const checkPassword = bcrypt.compareSync(password,hash.password)
            
        if(!checkPassword){
            throw reply.code(404).send({message:'User not found'})
        }

        const user =  await knex("account")
            .select("id","name",'administer')
            .where({
                email: email,
            })
            .first()

        try {            
            const secret= process.env.JWT_SECRET

            const token = jwt.sign(
                {
                id: user.id,
                name:user.name,
                administer: user.administer
                },
                secret,
            )

            return reply.status(200).send({user,token})

        } catch (err) {
            return reply.status(422).send({message:'Access deny'})
        }
    }
    
}