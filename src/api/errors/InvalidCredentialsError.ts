import { HttpError } from 'routing-controllers';

export class InvalidCredentialsError extends HttpError {
    constructor() {
        super(401, 'Invalid Credentials');
        Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
    }

    toJSON() {
        return {
            status: this.httpCode,
            errorCode: 'invalid-credentials',
            message: this.message,
        };
    }
}