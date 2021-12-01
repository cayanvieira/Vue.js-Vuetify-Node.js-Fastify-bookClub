exports.up = function(knex){
    return knex.schema.createTable('users', (table) => {
      
      table.increments("user_id");
  
      table.string('name');    
      
      table.string("lastName")

      table.string("document")

      table.string("registration")

      table.string("email")
  
      
        
    })
    .then(()=>console.log("Success Table Users"))    
  }; 
  
  exports.down = function (knex) {
    return knex.schema.dropTable('users')
  };