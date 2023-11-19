import { PrismaClient } from '@prisma/client'
import Container from 'typedi';
import { Database } from './db';

export const prisma = new PrismaClient().$extends({
    query: {
        file: {
            async create({ model, operation, args, query }) {
                // Adds a new notification for every user session in the database
                const userId = args.data.owner.connect.id;
                const db = Container.get(Database);

                const userSessions = await db.notification_sessions.findMany({ where: { userId } });

                await Promise.all(userSessions.map((session) => {
                    return db.notification_sessions.update({
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

                return query(args);
            },
        }
    }
});