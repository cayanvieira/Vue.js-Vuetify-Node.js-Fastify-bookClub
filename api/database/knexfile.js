// Update with your config settings.

module.exports = {

  development: {         
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : '3636',
        database : 'crud'
      },
    migrations:{
      tableName:'knex_migrations'
    },
    searchPath: ['knex', 'public'],
  },   
  
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
