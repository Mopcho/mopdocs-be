import { HttpError } from 'routing-controllers';

export class ValidationError extends HttpError {
    constructor(message: string) {
        super(403, message);
        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    toJSON() {
        return {
            status: this.httpCode,
            code: 'validation-error',
            message: this.message,
        };
    }
}