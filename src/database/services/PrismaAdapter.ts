import { Service } from "typedi";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";

@Service()
export class PrismaAdapter {
    constructor() { }

    createUser() {

    }

    async findUser(searchData?: Prisma.UserScalarWhereWithAggregatesInput) {
        return prisma.user.findFirst({
            where: searchData,
        });
    }
}