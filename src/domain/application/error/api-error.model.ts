export class ApiError {
    message: string;
    error: string;

    constructor(message: string, error: string) {
        this.message = message;
        this.error = error;
    }
}