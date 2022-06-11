
exports.up = function(knex){
    return knex.schema.createTable('favorite_club', (table) => {
      
      table.increments("id");
        
      table.integer('club_id').notNullable()
      table.foreign('club_id').references('club.id')

      table.integer('account_id').notNullable()
      table.foreign('account_id').references('account.id')
      
    })
    .then(()=>console.log("Success Table Favorite Club"))    
  }; 
  
  exports.down = function (knex) {
    return knex.schema.dropTable('favorite_club')
  };