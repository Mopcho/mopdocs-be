import { Prisma } from "@prisma/client";
import { AuthService, UserLoginData } from "../services/AuthService";
import { Service } from "typedi";
import { Body, Get, JsonController, Post, Req } from "routing-controllers";
import { responseFormatter } from "../utils";

@Service()
@JsonController('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/register')
    public async register(@Body() userCreateData: Prisma.UserCreateInput) {
        const serviceResponse = await this.authService.register(userCreateData)
        return responseFormatter(serviceResponse);
    }

    @Post('/login')
    public async login(@Body() userLoginData: UserLoginData, @Req() request) {
        const user = await this.authService.login(userLoginData);

        request.session.user = user;

        return responseFormatter(user);
    }

    @Get('/isAuth')
    public async isAuth(@Req() req) {
        return responseFormatter({ isAuth: Boolean(req.session.user) });
    }

    @Get('/logout')
    public async logout(@Req() req) {
        req.session.destroy(function (err) {
            console.log(err);
        })

        return responseFormatter({ ok: true });
    }
}