import * as Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('deploys', (table: Knex.TableBuilder) => {
    table.increments()
    table.text('nameProject').notNullable()
    table.text('secret').notNullable()
    table.text('email').notNullable()
    table.integer('userIdFk').unsigned().references('id').inTable('users').onDelete('CASCADE').index()
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('deploys')
}
