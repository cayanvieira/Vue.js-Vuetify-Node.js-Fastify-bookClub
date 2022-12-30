const bcrypt = require('bcrypt')
const knex = require('../database/client')

module.exports = class Service{
    async login(email,password){    
       
        const hash = await knex("account")
            .select('password')              
            .where('email',email)
            .first()

        const result = bcrypt.compareSync(password,hash.password)
            
        if(result === true ){
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