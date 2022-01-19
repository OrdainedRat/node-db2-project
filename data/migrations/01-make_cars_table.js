exports.up = async function (knex) {
  await knex.schema.createTable('cars', table => {
    table.increments()
    table.string('vin', 17).unique().notNullable()
    table.string('make').notNullable()
    table.string('model').notNullable()
    table.integer('mileage').notNullable()
    table.string('title', 128)
    table.string('transmission')
  })
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('fruits')
};
