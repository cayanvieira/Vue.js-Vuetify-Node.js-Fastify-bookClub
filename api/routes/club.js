async function routes(fastify, options) {

  fastify.post(
    "/club/create",
    {},
    async (request, reply) => {

      const { name } = request.body
      const { owner_name } = request.body
      const { owner_id } = request.body
      const { groupLimit } = request.body
      const { actualBook } = request.body
      const { password } = request.body


      fastify.knex("club")        
        .insert({
          name: name,
          owner_name: owner_name,
          owner_id: owner_id,
          group_limit: groupLimit,
          actual_book_id: actualBook,
          password: password
        })
        .then(
          newClub => reply.send(newClub)
        )
    },
  )

  fastify.get(
    "/club",
    async (reply) => {
      fastify.knex("club")
        .select('*')
        .then(data => reply.send(data))
    }
  )

  fastify.get(
    "/club/:id",
    async (request, reply) => {

      const { id } = request.params
      fastify.knex("club")
        .select('*')
        .where('id', id)
        .first()
        .then(data => reply.send(data))
    }
  )

  fastify.get(
    "/newclubs",
    async (request, reply) => {

      fastify.knex("club")
        .select('club.*','book.name as book_name')
        .orderBy('club.id', 'desc')
        .join('book','book.id','club.actual_book_id')        
        .then(data => reply.send(data.slice(0, 10)))
    }
  )

  fastify.post(
    "/club/login",
    {},
    async (request, reply) => {

      const { clubId } = request.body
      const { password } = request.body

      const auth = await fastify.knex("club")
        .select("club.id")
        .where(
          {
            id: clubId,
            password: password
          }
        )
        .first()
      if (auth) {
        reply.send(auth)
      }
      else {
        return null
      }

    },
  )

  fastify.put(
    '/club/create_description',
    async (request, reply) => {

      const { description } = request.body
      const { clubId } = request.body

      if (!description || !clubId) {
        return new Error("Dados Obrigatórios")
      }
      fastify.knex("club")
        .select('description')
        .where('id', clubId)
        .update({
          description: description
        })
        .then(() => reply.send('Description Update'))

    },
  )


  fastify.delete(
    '/club/:id/delete_description',
    async (request, reply) => {

      const { id } = request.params

      fastify.knex('club')
        .where('id', id)
        .update({
          description: null
        })
        .then((data) => reply.send(data))
    }
  )

  fastify.put(
    '/club/:id/update_description',
    async (request, reply) => {
      const { id } = request.params
      const { description } = request.body

      fastify.knex("club")
        .where('id', id)
        .update({
          description: description
        }).then(data => {
          if (!data === 1) {
            const result = "erro"
            reply.send(result)
          }
          const result = 'alterado'
          reply.send(result)
        })
    }
  )

  fastify.put(
    '/club/:id/update_book',
    async (request, reply) => {
      const { id } = request.params
      const { new_book } = request.body

      fastify.knex("club")
        .where('id', id)
        .update({
          actual_book_id: new_book
        })
        .then(data => reply.send(data))
    }
  )

  fastify.put(
    '/club/:id/update_password',
    async (request, reply) => {
      const { id } = request.params
      const { password } = request.body
      const { new_password } = request.body


      fastify.knex("club")
        .where('id', id)
        .where('password', password)
        .update({
          password: new_password
        })
        .then(data => reply.send(data))
    }
  )
 
  fastify.delete(
    '/club/:club_id/delete',
    async (request, reply) => {
      const { club_id } = request.params

      fastify.knex("favorite_club")
        .where('club_id', club_id)
        .del()
        .then(() => {
          fastify.knex('club')
          .where('id', club_id)
          .del()
          .then(data => reply.send(data))
        })
    }
  )


}

module.exports = routes;