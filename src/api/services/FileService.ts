import { LoggerInterface } from 'src/lib/logger';
import { Service } from 'typedi';
import { Logger } from '../decorators/Loger';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

@Service()
export class FileService {

    constructor(@Logger(__filename) private log: LoggerInterface,

    ) { }

    public async find() {
        this.log.info('Find all pets');
        return prisma.file.findMany();
    }

}