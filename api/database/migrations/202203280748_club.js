exports.up = function(knex){
    return knex.schema.createTable('club', (table) => {
      
      table.increments("id");
  
      table.string('name');    
      
     
      table.integer("actual_book_id");
      table.foreign("actual_book_id").references('book.id')

      table.string("owner_name");
     
      table.integer("owner_id");
      table.foreign('owner_id').references('account.id')

      table.string("password");

      table.integer("group_limit");

      table.string("description")

      table.string("meeting_date");

    })
    .then(()=>console.log("Success Table Club"))    
  }; 
  
  exports.down = function (knex) {
    return knex.schema.dropTable('club')
  };
  