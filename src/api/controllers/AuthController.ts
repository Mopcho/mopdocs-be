import { Body, JsonController, Post } from "routing-controllers";
import { Service } from "typedi";
import { AuthService, UserLoginData } from "../auth/AuthService";
import { Prisma } from "@prisma/client";

@JsonController('/auth')
@Service()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/register')
    public register(@Body() userCreateData: Prisma.UserCreateInput) {
        console.log(userCreateData);
        return this.authService.register(userCreateData);
    }

    @Post('/login')
    public login(@Body() userLoginData: UserLoginData) {
        return this.authService.login(userLoginData);
    }
}