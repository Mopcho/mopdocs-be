import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { S3Service } from './S3Service';

export const prisma = new PrismaClient();

@Service()
export class FileService {

    constructor(private readonly s3Service: S3Service) { }

    public async getSignature() {
        return this.s3Service.generatePreSignedUrl();
    }
}