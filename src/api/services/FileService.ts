import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { S3Service } from './S3Service';
import { Database } from 'src/database/db';
import { Prisma } from "@prisma/client";
import { getPagination } from '../utils';
import { Pagination } from '../types';

export const prisma = new PrismaClient();

@Service()
export class FileService {

    constructor(private readonly s3Service: S3Service, private readonly database: Database) { }

    public async generatePutPreSignedUrl(userId: string) {
        return this.s3Service.generatePutPreSignedUrl({ userId });
    }

    public createFile(data: Prisma.FileCreateArgs) {
        return this.database.files.create(data);
    }

    public findFiles(pagination?: Pagination) {
        const prismaPagination = getPagination(pagination);
        return this.database.files.find({
            take: prismaPagination.take,
            skip: prismaPagination.skip
        });
    }

    public deleteAllFiles() {
        return this.database.files.deleteAll();
    }

    public deleteOne(id: string) {
        this.s3Service.deleteFile(id);
        return this.database.files.deleteOne(id);
    }
}