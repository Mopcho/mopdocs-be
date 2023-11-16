import { HttpError } from 'routing-controllers';

export class AccessDeniedError extends HttpError {
    constructor(message: string) {
        super(403, message);
        Object.setPrototypeOf(this, AccessDeniedError.prototype);
    }

    toJSON() {
        return {
            status: this.httpCode,
            errorCode: 'access-denied',
            message: this.message,
        };
    }
}