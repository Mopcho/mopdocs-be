import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { Database } from 'src/database/db';

export const prisma = new PrismaClient();

@Service()
export class UserService {

    constructor(private readonly database: Database) { }

    public async getUser(userId: string) {
        return this.database.users.findUnique({ where: { id: userId } });
    }
}