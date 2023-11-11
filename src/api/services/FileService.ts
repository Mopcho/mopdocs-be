import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { S3Service } from './S3Service';
import { Database } from 'src/database/db';
import { FileCreateData } from 'src/database/types';

export const prisma = new PrismaClient();

@Service()
export class FileService {

    constructor(private readonly s3Service: S3Service, private readonly database: Database) { }

    public async generatePutPreSignedUrl(userId: string) {
        return this.s3Service.generatePutPreSignedUrl({ userId });
    }

    public createFile(data: FileCreateData) {
        return this.database.createFile(data);
    }

    public findFiles() {
        return this.database.findFiles();
    }

    public deleteAllFiles() {
        return this.database.deleteAllFiles();
    }
}