import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import {
	User,
	UserCreateData,
	UserFindData,
	UserFindUniqueData,
	UserUpdateData,
} from 'src/entities';
import { KNEX_CONNECTION } from 'src/knex';

@Injectable()
export class UsersService {
	constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

	findOne(userFindData: UserFindData) {
		return this.knex<User>('users').select('*').where(userFindData).first();
	}

	findUnique(userFindUniqueData: UserFindUniqueData) {
		return this.knex<User>('users')
			.select('*')
			.where(userFindUniqueData)
			.first();
	}

	async create(userCreateData: UserCreateData) {
		const [createdUser] = await this.knex<User>('users')
			.insert(userCreateData)
			.returning('*');

		return createdUser;
	}

	update(
		userUpdateData: UserUpdateData,
		userFindUniqueData: UserFindUniqueData,
	) {
		return this.knex<User>('users')
			.update(userUpdateData)
			.where(userFindUniqueData);
	}
}
