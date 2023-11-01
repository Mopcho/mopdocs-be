import { HttpError } from 'routing-controllers';

export class ValidationError extends HttpError {
    constructor(message: string) {
        super(403, `ValidationError: ${message}`);
    }
}