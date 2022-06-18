exports.up = function(knex){
    return knex.schema.createTable('favorite_book', (table) => {

        table.increments('id');

        table.integer('book_id').notNullable()
        table.foreign('book_id').references('book.id')

        table.integer('account_id').notNullable()
        table.foreign('account_id').references('account.id')
    })
    .then(() => console.log("Sucess Table Favorite Book"))
};

exports.down = function (knex) {
    return knex.schema.dropTable('favorite_book')
};