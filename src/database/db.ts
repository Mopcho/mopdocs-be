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

    async findUnique(searchData: Prisma.UserWhereUniqueInput) {
        return prisma.user.findUnique({
            where: searchData,
        });
    }

    async findUsers(searchData?: Prisma.UserWhereInput) {
        return prisma.user.findMany({
            where: searchData
        })
    }

    async updateUser(searchData: Prisma.UserWhereUniqueInput, updateData: Prisma.UserUpdateInput) {
        return prisma.user.update({
            where: searchData,
            data: updateData
        })
    }

    async deleteUser(searchData: Prisma.UserWhereUniqueInput) {
        return prisma.user.delete({
            where: searchData,
        })
    }

    async softDeleteUser(searchData: Prisma.UserWhereUniqueInput) {
        return prisma.user.update({
            where: searchData,
            data: {
                status: 'DELETED'
            }
        })
    }
}