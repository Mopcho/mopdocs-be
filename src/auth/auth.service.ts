import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/knex/constants';

@Injectable()
export class AuthService {
	constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

	async signIn() {
		const response = await this.knex().select('*').from('users');
		return { data: response };
	}

	async signUp() {
		return { ok: true };
	}
}
