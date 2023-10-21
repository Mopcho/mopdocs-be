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

    async findUser(searchData?: Prisma.UserScalarWhereWithAggregatesInput) {
        return prisma.user.findFirst({
            where: searchData,
        });
    }
}