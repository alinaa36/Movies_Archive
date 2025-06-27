import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  userData?: string | JwtPayload;
}
export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Authentication Failed' });
      return;
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as
      | string
      | JwtPayload;

    req.userData = decoded;
    next(); // ✅ все добре — передаємо далі
  } catch (err) {
    res.status(401).json({ message: 'Authentication Failed' });
  }
};
