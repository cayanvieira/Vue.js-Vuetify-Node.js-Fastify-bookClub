const bcrypt = require('bcrypt')
const knex = require('../database/client')

module.exports = class Service{
    async login(email,password,reply){

        if(!email){
            return reply.code(422).send({message:" Campo e-mail vazio"})
        }
        if(!password){
            return reply.code(422).send({message:" Campo senha vazio"})
        }
       
        const user = await knex("account")
            .select('password')              
            .where('email',email)
            .first()

        const compare = bcrypt.compareSync(password,user.password)
            
        if(compare === true ){
            const auth =  knex("account")
            .select("id","name",'administer')
            .where({
                email: email,
            })
            .first()
            .then(data => data)
            
            return auth
        }else {
            throw 'Error 404 - User and password not found'
        }

        


    }
    
}