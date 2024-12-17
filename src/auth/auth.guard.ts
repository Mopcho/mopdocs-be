import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly usersService: UsersService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) {
			throw new UnauthorizedException();
		}
		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: this.configService.get<string>('JWT_SECRET'),
			});

			const userExists = await this.usersService.findUnique({
				id: payload.sub,
			});

			if (!userExists) {
				throw new UnauthorizedException();
			}

			request['user'] = payload;
		} catch {
			throw new UnauthorizedException();
		}
		return true;
	}

	private extractTokenFromHeader(request: Request) {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
