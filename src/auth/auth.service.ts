import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private configService: ConfigService) {}

    async signIn() {
        return { ok: this.configService.get<string>('DATABASE_USER') }
    }

    async signUp() {
        return { ok: true }
    }
}
