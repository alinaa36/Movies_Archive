import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export const validateDto = (dtoClass: any): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const instance = plainToInstance(dtoClass, req.body);
    const errors = await validate(instance);

    if (errors.length > 0) {
      const validationErrors = errors.map(err => ({
        field: err.property,
        errors: Object.values(err.constraints || {}),
      }));
      res.status(422).json({
        message: 'Validation failed',
        errors: validationErrors,
      });
      return; 
    }

    req.body = instance;
    next();
  };
};
