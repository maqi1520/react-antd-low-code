import express from 'express'
import { prisma } from '../prisma'
import { protect, Req } from '../middleware/auth'

const userRouter = express.Router()
userRouter.get('/', protect, async (req, res) => {
  const data = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  })
  const total = await prisma.user.count()
  res.json({
    data,
    total,
  })
})

userRouter.get('/me', protect, async (req: Req, res) => {
  res.json(req.user)
})

export default userRouter
