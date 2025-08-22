export class ExtendedError extends Error {
    statusCode: number;

    constructor(message: string | undefined, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }

    static of(
        message: string,
        statusCode: number
    ): { message: string; statusCode: number } {
        return new this(message, statusCode).toObj();
    }

    toObj(): { message: string; statusCode: number } {
        return { ...this, message: this.message };
    }
}

export interface ExtendedError {
    message: string;
    statusCode: number;
}
