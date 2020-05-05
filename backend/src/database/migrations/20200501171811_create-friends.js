
exports.up = function(knex) {
  return knex.schema.createTable('friends', table=>{
      table.increments()
      table.timestamps(true, true)

      table.integer('user_id').notNullable()
      table.integer('friend_id').notNullable()
      table.enum('status', ['request', 'declined', 'accepted']).notNullable()

      table.foreign('user_id').references('id').inTable('users')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('friends')
};
