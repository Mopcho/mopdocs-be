
import { Database } from "src/database/db";
import { comparePassword, hashPassword } from "../utils";
import { Service } from "typedi";
import { UserCreateInput } from "src/database/types";
import { InvalidCredentialsError } from "../errors/InvalidCredentialsError";
import { Logger, LoggerInterface } from "src/decorators/Logger";
import { ValidationError } from "../errors/ValidationError";

export interface UserLoginData {
    email: string;
    password: string;
}

@Service()
export class AuthService {
    constructor(private readonly database: Database, @Logger(__filename) private log: LoggerInterface) { }

    public async register(userData: UserCreateInput) {
        this.log.info("Register hit");
        if (!userData.password || !userData.email) {
            throw new ValidationError('All fields must be filled');
        }
        const hashedPassword = await hashPassword(userData.password);
        userData.password = hashedPassword;
        const response = this.database.createUser(userData);

        return response;
    }

    public async login(userData: UserLoginData) {
        this.log.info("Login hit");
        const user = await this.database.findUnique({ email: userData.email });

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const isPasswordCorrect = await comparePassword(user.password, userData.password);

        if (!isPasswordCorrect) {
            throw new InvalidCredentialsError();
        }

        return {
            id: user.id,
            email: user.email,
            username: user.username,
        };
    }
}