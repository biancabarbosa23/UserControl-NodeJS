
exports.up = knex => knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('cpf').unique().notNullable()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.integer('nivel').notNullable()
    table.string('image').notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now())

})


exports.down = knex => knex.schema.dropTable('users')

