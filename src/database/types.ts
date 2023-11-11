import { Prisma } from "@prisma/client";

export type UserCreateInput = Prisma.UserCreateInput;

export interface UserLoginData {
    email: string;
    password: string;
}