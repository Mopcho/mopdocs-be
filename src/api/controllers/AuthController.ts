import { Prisma } from "@prisma/client";
import { AuthService, UserLoginData } from "../services/AuthService";
import { Service } from "typedi";
import { Body, Get, JsonController, Post, Req, UseBefore } from "routing-controllers";
import { isAuthenticated } from "../middlewares/IsAuthenticated";

@Service()
@JsonController('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/register')
    public register(@Body() userCreateData: Prisma.UserCreateInput) {
        return this.authService.register(userCreateData);
    }

    @Post('/login')
    public async login(@Body() userLoginData: UserLoginData, @Req() request) {
        const user = await this.authService.login(userLoginData);

        request.session.userId = user.id;

        return user;
    }

    @Get('/isAuth')
    @UseBefore(isAuthenticated)
    public async isAuth(@Req() req) {
        return Boolean(req.session.userId);
    }

    @Get('/logout')
    public async logout(@Req() req) {
        req.session.destroy(function (err) {
            console.log(err);
        })

        return true;
    }
}