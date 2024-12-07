import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
	development: {
		client: 'postgresql',
		connection: {
			database: 'mopdocs',
			user: 'mopcho',
			password: 'secret',
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},
};

module.exports = config;
