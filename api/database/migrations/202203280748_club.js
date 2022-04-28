exports.up = function(knex){
    return knex.schema.createTable('club', (table) => {
      
      table.increments("id");
  
      table.string('name');    
      
      table.string("actual_book");

      table.string("owner");
     
      table.string("password");

      table.integer("group_limit");

      table.json("description")

      table.string("meeting_date");

    })
    .then(()=>console.log("Success Table Users"))    
  }; 
  
  exports.down = function (knex) {
    return knex.schema.dropTable('club')
  };
  