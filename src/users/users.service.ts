import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/knex';
import { UserCreateData, UserUpdateData } from './interfaces';
import { UserFindData, UserFindUniqueData } from 'src/entities';

@Injectable()
export class UsersService {
	constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

	/**
	 * Finds the first matching user
	 */
	findOne(userFindData: UserFindData) {
		return this.knex('users').select('*').where(userFindData).first();
	}

	/**
	 * Find an user by an unique field
	 */
	findUnique(userFindUniqueData: UserFindUniqueData) {
		return this.knex('users').select('*').where(userFindUniqueData).first();
	}

	/**
	 * Creates a user in the database
	 */
	async create(userCreateData: UserCreateData) {
		const [createdUser] = await this.knex('users')
			.insert(userCreateData)
			.returning('*');

		return createdUser;
	}

	/**
	 * Updates the user with the specified id in the database
	 */
	update(userUpdateData: UserUpdateData, userId: string) {
		return this.knex('users').update(userUpdateData).where({ userId });
	}
}
