import { Request, Response } from 'express';
import { Middleware, ExpressErrorMiddlewareInterface, HttpError, InternalServerError } from 'routing-controllers';
import { Service } from 'typedi';

@Middleware({ type: 'after' })
@Service()
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, request: Request, response: Response, next: (err: any) => any) {
        if (error instanceof HttpError) {
            response.status(error.httpCode).send(error);
        } else {
            response.status(500).send(new InternalServerError("Unhandled Error"));
        }
    }
}