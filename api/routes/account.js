
async function routes(fastify, options) {  
  fastify.post(
    "/register",
    async (request,reply) => {

      const {name,birthData,email,password,sex,uf,confirmPassword} = request.body

      return fastify.service.Account.register(name,birthData,email,password,sex,uf,confirmPassword,reply)      
      
    },
  )

  
  fastify.get(
    "/:id/information",
    // {
    //   onRequest: [fastify.authenticate]
    // },    
    async (request) => {
      const { id } = request.params

      
      const data = fastify.knex('account')
        .select('name','birthData','sex','email','uf')
        .where('id', id)
        .first()        

      return data
    }
  )


  fastify.put(
    "/:id/update",
    {},
    async (request, reply) => {

      const { id } = request.params
      const { name } = request.body
      const { birthData } = request.body
      const { email } = request.body
      const { sex } = request.body
      const { uf } = request.body

      try {
        fastify.knex("account")
          .where('id', id)
          .update({
            name: name,
            birthData: birthData,
            email: email,
            sex: sex,
            uf: uf,
          })
          .then(
            newAccount => reply.send(newAccount)
          )
      }
      catch {
        console.log('Erro ao Alterar')
      }
    },
  )

  fastify.post(
    "/add_favorite_club",
    {},
    async (request, reply) => {
      const { clubId } = request.body
      const { accountId } = request.body

      fastify.knex("favorite_club")
        .insert({
          club_id: clubId,
          account_id: accountId
        })
        .then(() => reply.send(console.log('add favorite')))
    }
  )

  fastify.get(
    "/:account_id/favorited_club/:club_id",
    {},
    async (request) => {
      const { club_id } = request.params
      const { account_id } = request.params

      const favorite = await fastify.knex("favorite_club")
        .select('club_id')
        .where('account_id', account_id)
        .where('club_id', club_id)
        .first()

      return favorite
    }
  )

  fastify.delete(
    "/:account_id/remove_favorited_club/:club_id",
    {},
    async (request, reply) => {
      const { club_id } = request.params
      const { account_id } = request.params

      fastify.knex("favorite_club")

        .where('account_id', account_id)
        .where('club_id', club_id)
        .del()
        .then(data => reply.send(data))

    }
  )

  fastify.get(
    "/:account_id/favorited_club_list",
    {},
    async (request) => {

      const { account_id } = request.params

      const favorite = fastify.knex("favorite_club")
        .select("club.id", "club.name", 'club.actual_book_id','book.name as book_name')
        .where('account_id', account_id)
        .join('club', "club.id", 'favorite_club.club_id')
        .join('book','book.id','club.actual_book_id')


      return favorite
    }
  )

  fastify.delete(
    '/:id/delete',
    async (request) => {

      const { id } = request.params


      const del = fastify.knex('favorite_club')
        .where('account_id', id)
        .del()
        .then(() => {
          return fastify.knex('club')
            .where('owner_id', id)
            .del()
        })
        .then(() => {
          return fastify.knex('account')
            .where('id', id)
            .del()
        })
      return del

    }
  )

  fastify.get(
    '/:id/myclubs',
    async (request, reply) => {

      const { id } = request.params
      const myClubs = fastify.knex('club')
        .select('club.id', 'club.name', 'club.actual_book_id', "club.description", 'book.name as book_name')
        .where('owner_id', id)
        .join('book', 'book.id', 'club.actual_book_id')

      return myClubs
    }
  )

  fastify.post(
    "/:id/add_favorite_book",
    {},
    async (request, reply) => {
      const { bookId } = request.body
      const { id } = request.params

      var verifyFavorite =  await fastify.knex("favorite_book")
        .select('*')
        .where( 'book_id', bookId)
        .where('account_id',id)
        .first()
        
      if(verifyFavorite== undefined){
        fastify.knex("favorite_book")
        .insert({
          book_id: bookId,
          account_id: id
        })
        .then((data) => verifyFavorite = data)
        return verifyFavorite
      }
      
      return verifyFavorite || null
    }
  )
    //vereficar necessidade
  fastify.get(
    "/:id/favorite_book/:book_id",
    {},
    async (request, reply) => {
      const { book_id } = request.params
      const { id } = request.params

      fastify.knex("favorite_book")
        .where('account_id', id)
        .where('book_id', book_id)
        .first()
        .then(data => reply.send(data))
    }
  )

  fastify.delete(
    "/:id/remove_favorited_book/:book_id",
    {},
    async (request, reply) => {
      const { book_id } = request.params
      const { id } = request.params

      fastify.knex('favorite_book')
        .where('account_id', id)
        .where('book_id', book_id)
        .del()
        .then(data => reply.send(data))
    }
  )

  fastify.get(
    "/:id/favorited_book_list",
    {},
    async (request, reply) => {
      const { id } = request.params

      fastify.knex('favorite_book')
        .select('*')
        .where('account_id', id)
        .join('book', 'book.id', 'favorite_book.book_id')
        .then(data => reply.send(data))
    }
  )

  fastify.post(
    '/:id/add_my_library_read_list',
    async(request,reply)=>{
      const {id}=request.params
      const {book_id} = request.body

      var verifyRead =  await fastify.knex('my_library')
        .select('book_id','read','want_to_read')
        .where("account_id",id)
        .where("book_id",book_id)
        .where('read',true)
        .first()
        console.log(verifyRead)   
        
      var verifyWantToRead =  await fastify.knex('my_library')
      .select('book_id','read','want_to_read')
      .where("account_id",id)
      .where("book_id",book_id)
      .where('want_to_read',true)
      .first()
      console.log(verifyWantToRead) 
        

      if(verifyRead===undefined && verifyWantToRead===undefined){
        
       const result= await fastify.knex('my_library')        
        .insert({
          account_id:id,
          book_id:book_id,
          want_to_read:false,
          read:true
        }) 
        return verifyRead = result 
      }    

      if(verifyRead === undefined && verifyWantToRead?.want_to_read=== true){
        
       const result= await fastify.knex('my_library')
        .where("account_id",id)
        .where("book_id",book_id)
        .where('want_to_read',true)       
        .update({
          want_to_read:false,
          read:true
        }) 
        return verifyRead = result 
      }


      return verifyRead || verifyWantToRead
    }
  )

  fastify.post(
    '/:id/add_my_library_want_to_read_list',
    async(request,reply)=>{
      const {id}=request.params
      const {book_id} = request.body      

      var verifyWantToRead =  await fastify.knex('my_library')
      .select('book_id','read','want_to_read')
      .where("account_id",id)
      .where("book_id",book_id)
      .where('want_to_read',true)
      .first()
      console.log(verifyWantToRead)

      var verifyRead =  await fastify.knex('my_library')
        .select('book_id','read','want_to_read')
        .where("account_id",id)
        .where("book_id",book_id)
        .where('read',true)
        .first()
        console.log(verifyRead)   

      if(verifyRead===undefined && verifyWantToRead===undefined){
        console.log('oi')
       const result= await fastify.knex('my_library')        
        .insert({
          account_id:id,
          book_id:book_id,
          want_to_read:true,
          read:false
        })
        return verifyWantRead = result 
      }
      if(verifyRead?.read === true && verifyWantToRead === undefined){
        console.log("oioi")
        const result= await fastify.knex('my_library')
          .where("account_id",id)
          .where("book_id",book_id)
          .where('read',true)            
          .update({
            want_to_read:true,
            read:false
          }) 
         return verifyRead = result 
       } 

      return verifyRead || verifyWantToRead
    }
  )

  fastify.delete(
    "/:id/remove_want_to_read/:bookId",
    {},
    async(request, reply) => {
      const {id} = request.params
      const {bookId} = request.params

      fastify.knex('my_library')
      .where('account_id', id)
      .where('book_id', bookId)
      .where('want_to_read', true)
      .del()
      .then(data => reply.send(data))
    }
  )

  fastify.delete(
    "/:id/remove_read/:bookId",
    {},
    async(request, reply) => {
      const {id} = request.params
      const {bookId} = request.params

      fastify.knex('my_library')
      .where('account_id', id)
      .where('book_id', bookId)
      .where('read', true)
      .del()
      .then(data => reply.send(data))
    }
  )

  fastify.get(
    "/:id/want_to_read_list",
    async(request, reply) => {
      const {id} = request.params
      fastify.knex("my_library")
      .select('my_library.id','my_library.book_id','book.name','book.genre','book.edition','book.author','my_library.want_to_read')
      .where('account_id',id)
      .where('want_to_read',true)
      .join('book','book.id','my_library.book_id')
      .then(data => reply.send(data))
    }
  )

  fastify.get(
    "/:id/read_list",
    async(request, reply) => {
      const {id} = request.params
      fastify.knex("my_library")
      .select('my_library.id','my_library.book_id','book.name','book.genre','book.edition','book.author','my_library.read')
      .where('account_id',id)
      .where('read',true)
      .join('book','book.id','my_library.book_id')
      .then(data => reply.send(data))
    }
  )
}

module.exports = routes