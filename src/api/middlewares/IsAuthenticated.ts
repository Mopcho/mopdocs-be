import { ExpressMiddlewareInterface, UnauthorizedError } from "routing-controllers"
import { Service } from "typedi";

@Service()
export class isAuthenticated implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err?: any) => any) {
        if (request.session.user) {
            next();
        } else {
            throw new UnauthorizedError();
        }
    }
}