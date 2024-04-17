import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { S3Service } from './S3Service';
import { Database } from 'src/database/db';
import { getPagination } from '../utils';
import { Pagination } from '../types';
import { UserService } from './UserService';
import { NotFoundError } from 'routing-controllers';
import { AccessDeniedError } from '../errors/AccessDeniedError';

export const prisma = new PrismaClient();

interface FileCreateArgs {
    awsKey: string;
    contentType: string;
    ownerId: string;
}

@Service()
export class FileService {

    constructor(private readonly s3Service: S3Service, private readonly userService: UserService, private readonly database: Database) { }

    public async generatePutPreSignedUrl(userId: string) {
        return this.s3Service.generatePutPreSignedUrl({ userId });
    }

    public async createFile(data: FileCreateArgs) {
        const dbResponse = this.database.files.create({
            data: {
                awskey: data.awsKey,
                contentType: data.contentType,
                owner: {
                    connect: {
                        id: data.ownerId
                    }
                }
            }
        });

        // Adds a new notification for every user session in the database

        const userSessions = await this.database.notification_sessions.findMany({ where: { userId: data.ownerId } });

        await Promise.all(userSessions.map((session) => {
            return this.database.notification_sessions.update({
                where: { id: session.id }, data: {
                    notifications: {
                        create: {
                            type: 'update',
                            data: 'files',
                        }
                    }
                }
            })
        }));

        return dbResponse;
    }

    public async findFile(ownerId: string, awskey: string) {
        const file = await this.database.files.findUnique({
            where: {
                awskey,
                ownerId,
            },
        });

        if (!file) {
            return new NotFoundError("File Not Found");
        }

        const presignedUrl = await this.s3Service.generateGetPrsignedUrl(file.awskey);

        return {
            presignedUrl,
            ...file
        }
    }

    public findFiles(ownerId: string, pagination?: Pagination, fileType?: string) {
        const prismaPagination = getPagination(pagination);
        return this.database.files.find({
            where: {
                ownerId,
                contentType: {
                    contains: fileType
                }
            },
            take: prismaPagination.take,
            skip: prismaPagination.skip
        });
    }

    public deleteAllFiles() {
        return this.database.files.deleteAll();
    }

    public async deleteOne(awskey: string, ownerId: string) {
        const user = await this.userService.getUser(ownerId);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        const file = await this.database.files.findUnique({ where: { awskey } });

        if (!file) {
            throw new NotFoundError('File not found');
        }

        if (file.ownerId !== user.id) {
            throw new AccessDeniedError('You have no access to this file');
        }

        await this.s3Service.deleteFile(awskey);
        const dbResponse = this.database.files.deleteOne(awskey);

        // Adds a new notification for every user session in the database
        const userSessions = await this.database.notification_sessions.findMany({ where: { userId: user.id } });

        await Promise.all(userSessions.map((session) => {
            return this.database.notification_sessions.update({
                where: { id: session.id }, data: {
                    notifications: {
                        create: {
                            type: 'update',
                            data: 'files',
                        }
                    }
                }
            })
        }));

        return dbResponse;
    }
}