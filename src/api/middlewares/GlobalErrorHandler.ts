import { Request, Response } from 'express';
import { Middleware, ExpressErrorMiddlewareInterface, HttpError, InternalServerError } from 'routing-controllers';
import { Logger, LoggerInterface } from 'src/decorators/Logger';
import { Service } from 'typedi';

@Middleware({ type: 'after' })
@Service()
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
    constructor(@Logger(__filename) private log: LoggerInterface) { }
    error(error: any, request: Request, response: Response, next: (err: any) => any) {
        if (error instanceof HttpError) {
            response.status(error.httpCode).send(error);
        } else {
            response.status(500).send(new InternalServerError("Unhandled Error"));
            this.log.error('UnhandledError: ', error);
        }
    }
}