import { PrismaClient, User } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

interface Req extends Request {
  user: User
}

export async function protect(
  req: Req,
  res: Response,
  next: NextFunction
): Promise<any> {
  if (!req.cookies.token) {
    return next({
      message: 'You need to be logged in to visit this route',
      statusCode: 401,
    })
  }

  try {
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as User
    if (decoded.id) {
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      })

      req.user = user
    }

    next()
  } catch (error) {
    next({
      message: 'You need to be logged in to visit this route',
      statusCode: 401,
    })
  }
}
