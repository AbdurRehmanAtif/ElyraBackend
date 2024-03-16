class ApiResponse<T> {
    public statusCode: number;
    public success: boolean;
    public message: string;
    public data: T;

    constructor(statusCode: number, message: string = "success", data: T) {
        this.statusCode = statusCode;
        this.success = true;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse;
