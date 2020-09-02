import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tasks', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('status', 2).notNullable();
    table.specificType('createdAt', 'DATETIME(6)');
    table.specificType('updated_at', 'DATETIME(6)');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tasks');
}
