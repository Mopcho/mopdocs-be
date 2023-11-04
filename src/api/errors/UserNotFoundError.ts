import { HttpError } from 'routing-controllers';

export class UserNotFoundError extends HttpError {
    constructor() {
        super(404, 'User not found');
        Object.setPrototypeOf(this, UserNotFoundError.prototype);
    }

    toJSON() {
        return {
            status: this.httpCode,
            errorCode: 'user-not-found',
            message: this.message,
        };
    }
}