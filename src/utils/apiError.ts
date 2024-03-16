class ApiError extends Error {
    public statusCode: number;
    public data: any | null;
    public success: boolean;
    public errors: any[];
    public errorLog: string;

    constructor(
        statusCode: number,
        errorLog: string = "",
        message: string = "Something went wrong",
        errors: any[] = [],
        stack: string = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;
        this.errorLog = errorLog;

        if (stack) {
            this.stack = stack;
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;
