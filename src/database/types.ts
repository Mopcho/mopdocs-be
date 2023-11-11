import { Prisma } from "@prisma/client";

export type UserCreateInput = Prisma.UserCreateInput;
export interface FileCreateData {
    awskey: string;
    contentType: string;
    ownerId: string;
}

export interface UserLoginData {
    email: string;
    password: string;
}