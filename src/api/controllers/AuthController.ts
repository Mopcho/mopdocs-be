import { AuthService } from "../services/AuthService";
import { Service } from "typedi";
import { Body, Delete, Get, JsonController, Post, Req } from "routing-controllers";
import { responseFormatter } from "../utils";
import { UserCreateInput, UserLoginData } from "src/database/types";

@Service()
@JsonController('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/register')
    public async register(@Body() userCreateData: UserCreateInput) {
        const serviceResponse = await this.authService.register(userCreateData)
        return responseFormatter(serviceResponse);
    }

    @Post('/login')
    public async login(@Body() userLoginData: UserLoginData, @Req() request) {
        const user = await this.authService.login(userLoginData);

        request.session.user = user;

        return responseFormatter(user);
    }

    @Get('/me')
    public async me(@Req() request) {
        return responseFormatter(request.session.user);
    }

    // TODO: Remove this
    @Get('/sessions')
    public async getSessions() {
        return await this.authService.getSessions();
    }

    @Delete('/sessions')
    public async deleteAllSessions() {
        return await this.authService.deleteAllSessions();
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