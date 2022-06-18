exports.up = function(knex){
    return knex.schema.createTable('book', (table) => {
      
      table.increments("id");
  
      table.string('name');    
      
      table.string("edition");

      table.string("genre");
     
      table.string("author");

      table.string("code")

    })
    .then(()=>console.log("Success Table book"))    
  }; 
  
  exports.down = function (knex) {
    return knex.schema.dropTable('book')
  };