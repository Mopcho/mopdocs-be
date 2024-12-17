import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('users', function (table) {
		table
			.uuid('id', { primaryKey: true })
			.notNullable()
			.unique()
			.defaultTo(knex.fn.uuid());
		table.string('email', 255).unique().notNullable();
		table.string('username', 255).notNullable();
		table.string('password', 255).notNullable();
		table
			.timestamp('createdAt', { useTz: true })
			.defaultTo(knex.fn.now())
			.notNullable();
		table
			.timestamp('updateAt', { useTz: true })
			.defaultTo(knex.fn.now())
			.notNullable();
	});

	await knex.schema.createTable('workspaces', function (table) {
		table
			.uuid('id', { primaryKey: true })
			.notNullable()
			.unique()
			.defaultTo(knex.fn.uuid());
		table.string('name', 255).notNullable();
		table.uuid('ownerId').unsigned().notNullable();
		table
			.foreign('ownerId')
			.references('id')
			.inTable('users')
			.onDelete('CASCADE');
		table
			.timestamp('createdAt', { useTz: true })
			.defaultTo(knex.fn.now())
			.notNullable();
		table
			.timestamp('updatedAt', { useTz: true })
			.defaultTo(knex.fn.now())
			.notNullable();
	});

	await knex.schema.createTable('folders', function (table) {
		table
			.uuid('id', { primaryKey: true })
			.notNullable()
			.unique()
			.defaultTo(knex.fn.uuid());
		table.string('name', 255).notNullable();
		table.string('label', 255).nullable();
		table.uuid('workspaceId').unsigned().notNullable();
		table.uuid('parentFolderId').unsigned().nullable();
		table
			.foreign('workspaceId')
			.references('id')
			.inTable('workspaces')
			.onDelete('CASCADE');
		table
			.foreign('parentFolderId')
			.references('id')
			.inTable('folders')
			.onDelete('CASCADE');
		table
			.timestamp('createdAt', { useTz: true })
			.defaultTo(knex.fn.now())
			.notNullable();
		table
			.timestamp('updatedAt', { useTz: true })
			.defaultTo(knex.fn.now())
			.notNullable();
	});

	await knex.schema.createTable('workspaces_users', function (table) {
		table.uuid('workspaceId').unsigned().primary();
		table.uuid('userId').unsigned().primary();
		table
			.foreign('workspaceId')
			.references('id')
			.inTable('workspaces')
			.onDelete('CASCADE');
		table
			.foreign('userId')
			.references('id')
			.inTable('users')
			.onDelete('CASCADE');
	});

	await knex.schema.createTable('files', function (table) {
		table
			.uuid('id', { primaryKey: true })
			.notNullable()
			.unique()
			.defaultTo(knex.fn.uuid());
		table.string('mimeType', 255).notNullable();
		table.string('name', 255).notNullable();
		table.bigint('size').notNullable();
		table.string('label', 255).nullable();
		table.uuid('workspaceId').unsigned().notNullable();
		table.uuid('folderId').unsigned().nullable();
		table
			.foreign('workspaceId')
			.references('id')
			.inTable('workspaces')
			.onDelete('CASCADE');
		table
			.foreign('folderId')
			.references('id')
			.inTable('folders')
			.onDelete('CASCADE');
		table
			.timestamp('createdAt', { useTz: true })
			.defaultTo(knex.fn.now())
			.notNullable();
		table
			.timestamp('updatedAt', { useTz: true })
			.defaultTo(knex.fn.now())
			.notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('workspaces_users');
	await knex.schema.dropTable('files');
	await knex.schema.dropTable('folders');
	await knex.schema.dropTable('workspaces');
	await knex.schema.dropTable('users');
}
