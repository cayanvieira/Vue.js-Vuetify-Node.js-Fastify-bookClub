exports.up = function(knex){
    return knex.schema.createTable('account', (table) => {
      
      table.increments("id");
  
      table.string('name');    
      
      table.string("birthData");

      table.string("sex");

      table.string("email");

      table.string("password");

      table.string("uf");

      table.boolean("administer");
      
    })
    .then(()=>console.log("Success Table Account"))    
  }; 
  
  exports.down = function (knex) {
    return knex.schema.dropTable('account')
  };