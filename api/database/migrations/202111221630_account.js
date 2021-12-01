exports.up = function(knex){
    return knex.schema.createTable('account', (table) => {
        
        table.increments("account_id");

        table.string('login');

        table.string("password")
        
        table.string("email")

        table.timestamps("date_create")
            
    })
    .then(()=>console.log("Success Table Account"))
}; 

exports.down = function (knex) {
  return knex.schema.dropTable('account')
};

