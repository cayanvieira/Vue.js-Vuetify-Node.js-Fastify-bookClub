exports.up = function(knex){
    return knex.schema.createTable('club', (table) => {
      
      table.increments("id");
  
      table.string('name');    
      
      table.string("date_create");

      table.string("owner");
     
      table.string("actual_book");

      table.integer("group_limit");

    })
    .then(()=>console.log("Success Table Users"))    
  }; 
  
  exports.down = function (knex) {
    return knex.schema.dropTable('club')
  };