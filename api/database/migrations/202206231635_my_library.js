exports.up = function(knex){
    return knex.schema.createTable('my_library', (table) => {
        table.increments('id')

        table.integer('account_id').notNullable()
        table.foreign('account_id').references('account.id')

        table.integer('book_id').notNullable()
        table.foreign('book_id').references('book.id')

        table.boolean('read')

        table.boolean('want_to_read')       
    })
    .then(() => console.log("Sucess Table My Library"))
}

exports.down = function(knex) { 
    return knex.schema.dropTable('my_library')
}