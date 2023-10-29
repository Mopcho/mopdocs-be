import { Prisma } from "@prisma/client";
import { AuthService, UserLoginData } from "../services/AuthService";
import { Service } from "typedi";
import { Body, JsonController, Post } from "routing-controllers";

@Service()
@JsonController('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/register')
    public register(@Body() userCreateData: Prisma.UserCreateInput) {
        return this.authService.register(userCreateData);
    }

    @Post('/login')
    public login(@Body() userLoginData: UserLoginData) {
        return this.authService.login(userLoginData);
    }
}