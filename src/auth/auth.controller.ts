import {
	Body,
	Controller,
	Get,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('sign-up')
	signUp(@Body() signUpDto: SignUpDto) {
		return this.authService.signUp(signUpDto);
	}

	@Post('sign-in')
	signIn(@Body() signInDto: SignInDto) {
		return this.authService.signIn(signInDto);
	}

	@UseGuards(AuthGuard)
	@Get('profile')
	getProfile(@Request() request) {
		return request.user;
	}
}
