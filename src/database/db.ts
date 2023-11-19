import { Service } from "typedi";
import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

@Service()
export class Database {
    constructor() { }

    files = {
        create: (data: Prisma.FileCreateArgs) => {
            return prisma.file.create(data);
        },
        deleteAll: (data?: Prisma.FileDeleteManyArgs) => {
            return prisma.file.deleteMany(data);
        },
        deleteOne: (id: string) => {
            return prisma.file.delete({ where: { awskey: id } });
        },
        find: (data?: Prisma.FileFindManyArgs) => {
            return prisma.file.findMany(data);
        },
        findUnique: (data?: Prisma.FileFindUniqueArgs) => {
            return prisma.file.findUnique(data);
        },
    };

    sessions = {
        find: (data?: Prisma.SessionFindManyArgs) => {
            return prisma.session.findMany(data);
        },
        deleteAll: (data?: Prisma.SessionDeleteManyArgs) => {
            return prisma.session.deleteMany(data);
        },
    };

    users = {
        create: (data: Prisma.UserCreateArgs) => {
            return prisma.user.create(data);
        },
        find: (data?: Prisma.UserFindManyArgs) => {
            return prisma.user.findMany(data);
        },
        findUnique: (data: Prisma.UserFindUniqueArgs) => {
            return prisma.user.findUnique(data);
        },
        update: (data: Prisma.UserUpdateArgs) => {
            return prisma.user.update(data);
        }
    };

    notification_sessions = {
        getNotifications: async (searchData: Prisma.NotificationSessionWhereUniqueInput) => {
            const response = await prisma.notificationSession.findUnique({
                where: searchData,
                select: {
                    notifications: true
                }
            });

            return response?.notifications;
        },
        create: (data: Prisma.NotificationSessionCreateArgs) => {
            return prisma.notificationSession.create(data);
        },
        upsert: (data: Prisma.NotificationSessionUpsertArgs) => {
            return prisma.notificationSession.upsert(data);
        },
        delete: (data: Prisma.NotificationSessionDeleteArgs) => {
            return prisma.notificationSession.delete(data);
        },
        findUnique: (data: Prisma.NotificationSessionFindUniqueArgs) => {
            return prisma.notificationSession.findUnique(data);
        },
        update: (data: Prisma.NotificationSessionUpdateArgs) => {
            return prisma.notificationSession.update(data);
        },
        updateMany: (data: Prisma.NotificationSessionUpdateManyArgs) => {
            return prisma.notificationSession.updateMany(data);
        },
        findMany: (data: Prisma.NotificationSessionFindManyArgs) => {
            return prisma.notificationSession.findMany(data);
        }
    }

    notifications = {
        delete: (data: Prisma.NotificationDeleteArgs) => {
            return prisma.notification.delete(data);
        }
    }
}