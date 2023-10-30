import { ExpressMiddlewareInterface, UnauthorizedError } from "routing-controllers"
import { Service } from "typedi";

@Service()
export class isAuthenticated implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err?: any) => any) {
        console.log(request.session);
        if (request.session.userId) {
            next();
        } else {
            throw new UnauthorizedError();
        }
    }
}