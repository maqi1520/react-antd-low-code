import { Request, Response, NextFunction } from 'express';

export async function errorHandler(
  err: {
    statusCode: number;
    message: string;
  },
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const defaultErr = {
    message: 'Express error handler caught unknown middleware',
    statusCode: 500,
  };
  const { statusCode, message } = { ...defaultErr, ...err };
  res.status(statusCode).json({
    message,
  });
}
