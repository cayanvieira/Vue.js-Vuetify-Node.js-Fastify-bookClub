const knex = require('../database/client')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer")

module.exports = class Service{

    async register(name,birthData,email,password,sex,uf,confirmPassword,reply){
        const userExist = await knex('account')
        .where('email',email)
        .first()

      if(!name){
        throw reply.code(422).send({message:"O campo 'nome' é obrigatorio"})
      }
      if(!email){
        return  reply.code(422).send({message:"O campo 'e-mail' é obrigatorio"})
      }
      if(userExist){
        return reply.status(422).send({message:`E-mail já casdatrado.`})
      }        
      if(!password){
        return  reply.code(422).send({message:"O campo 'senha' é obrigatorio"})
      }
      if(password != confirmPassword){
        return   reply.code(422).send({message:`Senha e confirmação de senha não são iguais`})
      }


      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password,salt)

      let sendEmail = false

      try {
        knex("account")
          .insert({
            name: name,
            birthData: birthData,
            email:email,
            password: hash,
            sex: sex,
            uf: uf,
            administer: false
          })
          .then(
            newAccount => {
              sendEmail = true              
              return newAccount
            }

          )
      }
      catch {
       throw 'Erro ao cadastrar'
      }

      
      if(sendEmail === true){    
        let transporter  = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, 
          auth: {
            user: 'filipecayandev@gmail.com', 
            pass: process.env.NODE_MAIL_PASSWORD, 
          },
        })

        let info = await transporter.sendMail({
          from: 'Clube do Livro <filipecayandev@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "Bem-vindo", // Subject line
          text: "Welcome to BookClub", // plain text body          
        });
        
        return info
      }
      else{
        throw 'Erro ao enviar email'
      }
    }
}