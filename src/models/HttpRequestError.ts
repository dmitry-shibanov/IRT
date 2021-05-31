class HttpRequestError extends Error {
    public _statusCode: string | number;
    constructor(message: string, statusCode: string | number) {
        super(message);
        this._statusCode = statusCode;
    }

    public get statusCode() {
        return this._statusCode
    }
}

export default HttpRequestError;