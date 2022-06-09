async function routes (fastify, options) {

  fastify.post(
    "/account/register",
    {},
    async(request,reply) => {

      const {name} = request.body
      const {birthData} = request.body
      const {email} = request.body
      const {password} = request.body
      const {sex} = request.body
      const {uf} = request.body
     
      try {fastify.knex("account")
        .insert({
          name:name,
          birthData:birthData,        
          email:email,
          password:password,
          sex:sex,
          uf:uf,
          administer:false  
        })   
        .then(
          newAccount => reply.send(newAccount)
        )
      }
      catch{
        console.log('Erro ao cadastrar')
      }  
    },  
  )

  fastify.get(
    "/account/:id/data",
    async(request)=>{
      const {id} = request.params

      const knex =require('../database/client')
      const data = knex('account')
        .select('*')
        .where('id',id)
        .first()
        .then(item=> {
          delete item.id
          delete item.password
          delete item.administer
          return item
        })
        
      return data
    }
  )
  

  fastify.put(
    "/account/:id/update",
    {},
    async(request,reply) => {

      const {id} = request.params
      const {name} = request.body
      const {birthData} = request.body
      const {email} = request.body
      const {sex} = request.body
      const {uf} = request.body
     
      try {fastify.knex("account")
        .where('id',id)
        .update({
          name:name,
          birthData:birthData,        
          email:email,
          sex:sex,
          uf:uf,
        })   
        .then(
          newAccount => reply.send(newAccount)
        )
      }
      catch{
        console.log('Erro ao Alterar')
      }  
    },  
  )

  fastify.post(
    "/account/add_favorite_club",
    {},
    async(request)=>{
      const {clubId} = request.body
      const {accountId} = request.body

      fastify.knex("favorite_club")
      .insert({
        club_id:clubId,
        account_id:accountId
      })
      .then(()=>console.log('add favorite'))
    }
  )

  fastify.get(
    "/account/:account_id/favorited_club/:club_id",
    {},
    async(request)=>{
      const {club_id} = request.params
      const {account_id} = request.params

      const favorite = await fastify.knex("favorite_club")
        .select('club_id')
        .where('account_id', account_id)
        .where('club_id', club_id)
        .first()
      console.log(favorite)
      if(favorite.club_id){
        return true
      }else{
        return false
      }
    }
  )

  fastify.delete(
    "/account/:account_id/remove_favorited_club/:club_id",
    {},
    async(request,reply)=>{
      const {club_id} = request.params
      const {account_id} = request.params

      fastify.knex("favorite_club")
        
        .where('account_id', account_id)
        .where('club_id', club_id)
        .del()
      .then(data => reply.send(data))
      
    }
  )

  fastify.get(
    "/account/:account_id/favorited_club_list/",
    {},
    async(request)=>{
      const {club_id} = request.params
      const {account_id} = request.params

      const favorite = fastify.knex("favorite_club")
        .select('club_id')
        .where('account_id', account_id)
        
      
      return favorite
    }
  )
}
  
  module.exports = routes