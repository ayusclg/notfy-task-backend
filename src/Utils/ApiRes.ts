class ApiResponse extends Error{
    statusCode: number;
    data: any;
    success: boolean


    constructor(
    statusCode: number,
    data: any = null,
    message: string = "Something went wrong",
    stack: string = ""
    ) 
    {
        super(message)
        this.statusCode = statusCode
        this.success = false
        this.data = data
        if (stack) {
            this.stack = stack
        }
        else 
        {
            Error.captureStackTrace(this,this.constructor)
            }
    }
}