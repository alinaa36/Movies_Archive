import { HttpException } from '#utils/http-exeption.js';
import { Request, Response, NextFunction } from 'express';


export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err instanceof HttpException ? err.status : 500;
  const message = err.message || 'Something went wrong';

  res.status(status).json({ message });
}
