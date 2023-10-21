import { Prisma } from "@prisma/client";
import { comparePassword, hashPassword } from "../utils";
import { Service } from "typedi";
import { DatabaseLayer } from "src/database/DatabaseLayer";

export interface UserLoginData {
    email: string;
    password: string;
}

@Service()
export class AuthService {
    constructor(private readonly database: DatabaseLayer) { }

    public async register(userData: Prisma.UserCreateInput) {
        const hashedPassword = await hashPassword(userData.password);
        userData.password = hashedPassword;
        const response = this.database.createUser();

        return response;
    }

    public async login(userData: UserLoginData) {
        const user = await this.database.findUser();

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