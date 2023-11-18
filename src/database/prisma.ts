import { PrismaClient } from '@prisma/client'
import Container from 'typedi';
import { Database } from './db';

export const prisma = new PrismaClient().$extends({
    query: {
        file: {
            async create({ model, operation, args, query }) {
                const db = Container.get(Database);
                await db.notification_sessions.update({
                    where: { userId: args.data.owner.connect.id }, data: {
                        notifications: {
                            create: {
                                type: 'update',
                                data: 'files'
                            }
                        }
                    }
                }).catch();

                return query(args);
            },
        }
    }
});