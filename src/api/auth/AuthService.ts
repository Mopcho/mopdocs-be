import { Prisma } from "@prisma/client";
import { prisma } from "../../database/prisma";
import { Service } from "typedi";
import { comparePassword, hashPassword } from "./utils";

export interface UserLoginData {
    email: string;
    password: string;
}

@Service()
export class AuthService {
    constructor() { }

    public async register(userData: Prisma.UserCreateInput) {
        const hashedPassword = await hashPassword(userData.password);
        userData.password = hashedPassword;
        const response = await prisma.user.create({
            data: userData
        });

        return response;
    }

    public async login(userData: UserLoginData) {
        const user = await prisma.user.findUnique({
            where: { email: userData.email }
        });

        if (!user) {
            return undefined;
        }

        const isPasswordCorrect = await comparePassword(user.password, userData.password);

        if (!isPasswordCorrect) {
            return undefined;
        }

        return true;
    }
}