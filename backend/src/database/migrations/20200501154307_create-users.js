
exports.up = function(knex) {
  return knex.schema.createTable('users', table=>{
      table.increments()
      table.timestamps(true, true)
      table.string('name').notNullable()
      table.string('surname').notNullable()
      table.date('birth').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
