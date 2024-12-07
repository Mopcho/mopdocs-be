import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users', function (table) {
		table.uuid('id', { primaryKey: true }).notNullable().unique(),
			table.string('email', 255).unique().notNullable(),
			table.string('username', 255).notNullable();
		table.string('password', 255).notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('users');
}
