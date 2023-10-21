import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export class FileService {

    constructor() { }

    public async find() {
        return prisma.file.findMany();
    }
}