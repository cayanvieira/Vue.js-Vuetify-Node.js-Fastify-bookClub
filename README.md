# bookClub


Sistema de criação de clubes do livro criado com Vue.js para o Front-end e Node.js para o Back-end
Nuxt como framework Vue
Fastify como framework Node
Knex como SQL query builder

Book club creation system created with Vue.js for the Front-end and Node.js for the Back-end
Nuxt as Vue framework
Fastify as Node framework
Knex as SQL query builder


// para ligar o servidor backend va na pasta api
    nodemon server.js
// para ligar o frontend va na pasta web
    npm run dev
// subir tabelas
    knex migrate:latest
// descer tabelas
    knex migrate:down
