import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { S3Service } from './S3Service';
import { Database } from 'src/database/db';
import { Prisma } from "@prisma/client";

export const prisma = new PrismaClient();

@Service()
export class FileService {

    constructor(private readonly s3Service: S3Service, private readonly database: Database) { }

    public async generatePutPreSignedUrl(userId: string) {
        return this.s3Service.generatePutPreSignedUrl({ userId });
    }

    public createFile(data: Prisma.FileCreateInput) {
        return this.database.files.create(data);
    }

    public findFiles() {
        return this.database.files.find();
    }

    public deleteAllFiles() {
        return this.database.files.deleteAll();
    }
}