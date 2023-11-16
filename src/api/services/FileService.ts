import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { S3Service } from './S3Service';
import { Database } from 'src/database/db';
import { Prisma } from "@prisma/client";
import { getPagination } from '../utils';
import { Pagination } from '../types';
import { UserService } from './UserService';
import { NotFoundError } from 'routing-controllers';
import { AccessDeniedError } from '../errors/AccessDeniedError';

export const prisma = new PrismaClient();

@Service()
export class FileService {

    constructor(private readonly s3Service: S3Service, private readonly userService: UserService, private readonly database: Database) { }

    public async generatePutPreSignedUrl(userId: string) {
        return this.s3Service.generatePutPreSignedUrl({ userId });
    }

    public createFile(data: Prisma.FileCreateArgs) {
        return this.database.files.create(data);
    }

    public findFiles(ownerId: string, pagination?: Pagination) {
        const prismaPagination = getPagination(pagination);
        return this.database.files.find({
            where: {
                ownerId
            },
            take: prismaPagination.take,
            skip: prismaPagination.skip
        });
    }

    public deleteAllFiles() {
        return this.database.files.deleteAll();
    }

    public async deleteOne(id: string, ownerId: string) {
        const user = await this.userService.getUser(ownerId);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        const file = await this.database.files.findUnique({ where: { id } });

        if (!file) {
            throw new NotFoundError('File not found');
        }

        if (file.ownerId !== user.id) {
            throw new AccessDeniedError('You have no access to this file');
        }

        await this.s3Service.deleteFile(id);
        return this.database.files.deleteOne(id);
    }
}