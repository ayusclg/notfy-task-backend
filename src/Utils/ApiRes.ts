class ApiResponse extends Error {
    statusCode: number;
    data: any;
    success: boolean


    constructor(
        statusCode: number,
        data: any = null,
        message: string = "Successfully Done",

    ) {
        super(message)
        this.statusCode = statusCode
        this.success = statusCode < 400
        this.data = data
        
    }
}
export default ApiResponse