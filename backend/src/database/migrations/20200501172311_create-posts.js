
exports.up = function(knex) {
  return knex.schema.createTable('posts', table=>{
    table.increments()
    table.timestamps(true, true)

    table.integer('user_id').notNullable()
    
    table.text('content').notNullable()

    table.foreign('user_id').references('id').inTable('users')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts')  
};