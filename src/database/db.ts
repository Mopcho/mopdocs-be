import { Service } from "typedi";
import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

@Service()
export class Database {
    constructor() { }

    files = {
        create: (data: Prisma.FileCreateInput) => {
            return prisma.file.create({ data });
        },
        deleteAll: () => {
            return prisma.file.deleteMany();
        },
        find: () => {
            return prisma.file.findMany();
        },
    };

    sessions = {
        find: () => {
            return prisma.session.findMany();
        },
        deleteAll: () => {
            return prisma.session.deleteMany();
        },
    };

    users = {
        create: (createData: Prisma.UserCreateInput) => {
            return prisma.user.create({
                data: createData
            });
        },
        find: (searchData?: Prisma.UserWhereInput) => {
            return prisma.user.findMany({
                where: searchData
            });
        },
        findUnique: (searchData: Prisma.UserWhereUniqueInput) => {
            return prisma.user.findUnique({
                where: searchData
            });
        },
    };
}