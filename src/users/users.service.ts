import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/knex';
import {
	UserCreateData,
	UserFindData,
	UserFindUniqueData,
	UserUpdateData,
} from 'src/common/interfaces';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../common/events';

@Injectable()
export class UsersService {
	constructor(
		@Inject(KNEX_CONNECTION) private readonly knex: Knex,
		private readonly eventEmitter: EventEmitter2,
	) {}

	/**
	 * Finds the first matching user
	 */
	findFirst(userFindData: UserFindData) {
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

		this.eventEmitter.emit(
			'user.created',
			new UserCreatedEvent({ id: createdUser.id }),
		);

		return createdUser;
	}

	/**
	 * Updates the user with the specified id in the database
	 */
	update(
		userUpdateData: UserUpdateData,
		userFindUniqueData: UserFindUniqueData,
	) {
		return this.knex('users').update(userUpdateData).where(userFindUniqueData);
	}
}
