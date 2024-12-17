import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInData, SignUpData } from './interfaces';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SALT_ROUNDS } from './constants';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtServie: JwtService,
	) {}

	async signIn(signInData: SignInData) {
		const user = await this.usersService.findUnique({
			email: signInData.email,
		});

		if (!user) {
			throw new UnauthorizedException();
		}

		const payload = {
			sub: user.id,
			username: user.username,
			email: user.email,
		};

		return { jwt: await this.jwtServie.signAsync(payload) };
	}

	async signUp(signUpData: SignUpData) {
		const userWithSameEmail = await this.usersService.findUnique({
			email: signUpData.email,
		});

		if (userWithSameEmail) {
			throw new ConflictException('This email is already in use');
		}

		const hashedPassword = await hash(signUpData.password, SALT_ROUNDS);

		const newUser = await this.usersService.create({
			email: signUpData.email,
			username: signUpData.username,
			password: hashedPassword,
		});

		const { password, ...response } = newUser;

		return response;
	}
}
