import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

export class SignUpDto {
	@IsEmail()
	email: string;

	@IsStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1 })
	password: string;

	@Length(3, 15)
	username?: string;
}
