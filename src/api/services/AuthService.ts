
import { Database } from "src/database/db";
import { comparePassword, hashPassword } from "../utils";
import { Service } from "typedi";
import { UserCreateInput, UserLoginData } from "src/database/types";
import { InvalidCredentialsError } from "../errors/InvalidCredentialsError";
import { Logger, LoggerInterface } from "src/decorators/Logger";
import { ValidationError } from "../errors/ValidationError";
import { UserLoginDataValidator, UserValidator } from "../validators";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

@Service()
export class AuthService {
    constructor(private readonly database: Database, @Logger(__filename) private log: LoggerInterface) { }

    public async register(userData: UserCreateInput) {
        try {
            UserValidator.parse(userData);
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                throw new ValidationError(fromZodError(err).message)
            }
        }

        if (!userData.password || !userData.email) {
            throw new ValidationError('All fields must be filled');
        }
        const hashedPassword = await hashPassword(userData.password);
        userData.password = hashedPassword;
        const response = this.database.users.create(userData);

        return response;
    }

    public async getSessions() {
        return this.database.sessions.find();
    }

    public async deleteAllSessions() {
        return this.database.sessions.deleteAll();
    }

    public async login(userData: UserLoginData) {
        try {
            UserLoginDataValidator.parse(userData);
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                throw new ValidationError(fromZodError(err).message)
            }
        }

        const user = await this.database.users.findUnique({ email: userData.email });

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