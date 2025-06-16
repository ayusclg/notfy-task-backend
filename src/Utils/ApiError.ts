class ApiError extends Error {
  statusCode: number;
  data: any;
  success: boolean;

  constructor(
    statusCode: number,
    data: any = null,
    message: string = "Something went wrong",
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;