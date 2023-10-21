import { comparePassword, hashPassword } from "../utils";
import { Service } from "typedi";
import { Database } from "src/database/Database";
import { UserCreateInput } from "src/database/types";

export interface UserLoginData {
    email: string;
    password: string;
}

@Service()
export class AuthService {
    constructor(private readonly database: Database) { }

    public async register(userData: UserCreateInput) {
        const hashedPassword = await hashPassword(userData.password);
        userData.password = hashedPassword;
        const response = this.database.createUser(userData);

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