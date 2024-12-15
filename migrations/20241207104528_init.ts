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
			table.string('mimeType', 255).notNullable(),
			table.string('fileName', 255).notNullable(),
			table.bigint('size').notNullable(),
			table.string('label', 255).nullable(),
			table.uuid('parentId').unsigned().index(),
			table.uuid('userId').unsigned(),
			table
				.foreign('parentId')
				.references('id')
				.inTable('files')
				.onDelete('CASCADE'),
			table
				.foreign('userId')
				.references('id')
				.inTable('users')
				.onDelete('CASCADE'),
			table
				.timestamp('createdAt', { useTz: true })
				.defaultTo(knex.fn.now())
				.notNullable(),
			table
				.timestamp('updatedAt', { useTz: true })
				.defaultTo(knex.fn.now())
				.notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('files');
	return knex.schema.dropTable('users');
}
