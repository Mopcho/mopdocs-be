import { Service } from "typedi";
import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";
import { FileCreateData } from "src/api/types";

@Service()
export class Database {
    constructor() { }

    async getSessions() {
        return prisma.session.findMany();
    }

    createFile(data: FileCreateData) {
        return prisma.file.create({
            data: {
                awskey: data.awskey,
                contentType: data.contentType,
                owner: {
                    connect: {
                        id: data.ownerId
                    }
                }
            }
        });
    }

    deleteAllFiles() {
        return prisma.file.deleteMany();
    }

    findFiles() {
        return prisma.file.findMany();
    }

    async deleteAllSessions() {
        return prisma.session.deleteMany();
    }

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