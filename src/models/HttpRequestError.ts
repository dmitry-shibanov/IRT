class HttpRequestError extends Error {
    private _statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this._statusCode = statusCode;
    }

    public statusCode = () => {
        return this._statusCode;
    }
}

export default HttpRequestError;