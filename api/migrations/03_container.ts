import * as Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('containers', (table: Knex.TableBuilder) => {
    table.increments()
    table.integer('order').notNullable()
    table.json('config').notNullable()
    table.integer('userIdFk').unsigned().references('id').inTable('users').onDelete('CASCADE').index()
    table.integer('deployIdFk').unsigned().references('id').inTable('deploys').onDelete('CASCADE').index()
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('containers')
}
