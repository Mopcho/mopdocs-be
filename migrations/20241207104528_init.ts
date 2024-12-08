import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('users', function (table) {
		table
			.uuid('id', { primaryKey: true })
			.notNullable()
			.unique()
			.defaultTo(knex.fn.uuid()),
			table.string('email', 255).unique().notNullable(),
			table.string('username', 255).notNullable(),
			table.string('password', 255).notNullable(),
			table
				.timestamp('createdAt', { useTz: true })
				.defaultTo(knex.fn.now())
				.notNullable(),
			table
				.timestamp('updateAt', { useTz: true })
				.defaultTo(knex.fn.now())
				.notNullable();
	});

	return knex.schema.createTable('files', function (table) {
		table
			.uuid('id', { primaryKey: true })
			.notNullable()
			.unique()
			.defaultTo(knex.fn.uuid()),
			table.string('path', 255).unique().notNullable(),
			table.string('mimeType', 255).notNullable(),
			table.string('name', 255).notNullable(),
			table
				.timestamp('createdAt', { useTz: true })
				.defaultTo(knex.fn.now())
				.notNullable(),
			table
				.timestamp('updateAt', { useTz: true })
				.defaultTo(knex.fn.now())
				.notNullable(),
			table.uuid('userId').unsigned(),
			table
				.foreign('userId')
				.references('id')
				.inTable('users')
				.onDelete('CASCADE');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('users');
	return knex.schema.dropTable('files');
}
