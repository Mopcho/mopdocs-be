import { Service } from "typedi";
import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

@Service()
export class Database {
    constructor() { }

    async createUser(createData: Prisma.UserCreateInput) {
        return prisma.user.create({
            data: createData
        });
    }

    async findUser(searchData?: Prisma.UserWhereInput) {
        return prisma.user.findFirst({
            where: searchData,
        });
    }

    async findUsers(searchData?: Prisma.UserWhereInput) {
        return prisma.user.findMany({
            where: searchData
        })
    }
}