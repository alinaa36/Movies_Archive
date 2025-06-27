export class HttpException extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'HttpException';
    Error.captureStackTrace(this, this.constructor);
  }
}
