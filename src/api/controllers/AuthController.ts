import { Prisma } from "@prisma/client";
import { AuthService, UserLoginData } from "../services/AuthService";
import { Service } from "typedi";

@Service()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    public register(userCreateData: Prisma.UserCreateInput) {
        return this.authService.register(userCreateData);
    }

    public login(userLoginData: UserLoginData) {
        return this.authService.login(userLoginData);
    }
}