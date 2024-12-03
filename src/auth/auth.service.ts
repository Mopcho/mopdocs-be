import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    async signIn() {
        return { ok: true }
    }

    async signUp() {
        return { ok: true }
    }
}
