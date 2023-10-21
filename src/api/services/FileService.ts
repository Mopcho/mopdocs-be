import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';

export const prisma = new PrismaClient();

@Service()
export class FileService {

    constructor() { }

    public async find() {
        return prisma.file.findMany();
    }
}