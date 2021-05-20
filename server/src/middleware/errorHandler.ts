import { Request, Response, NextFunction } from 'express'

export async function errorHandler(
  err: {
    statusCode: number
    message: string
  },
  req: Request,
  res: Response,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): Promise<any> {
  const { statusCode, message } = err
  res.status(statusCode).json({
    message,
  })
}
