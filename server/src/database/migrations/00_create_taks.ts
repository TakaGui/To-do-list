import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tasks', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('status').notNullable();

    table.timestamp('created_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      .notNullable();

    table.timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tasks');
}
