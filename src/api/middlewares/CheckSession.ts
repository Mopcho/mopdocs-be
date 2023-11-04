import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import { compareAsc } from 'date-fns';

@Middleware({ type: 'before' })
@Service()
export class DeleteSessionOnExpiredDate implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err?: any) => any) {
        if (compareAsc(request.session.cookie.expires, new Date()) === -1) {
            request.session.destroy();
        }
        next();
    }
}