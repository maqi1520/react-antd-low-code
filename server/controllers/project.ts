import express from 'express'
import { prisma } from '../prisma'
import { protect, Req } from '../middleware/auth'

const router = express.Router()
router.get('/', protect, async (req: Req, res) => {
  const data = await prisma.project.findMany({
    where: {
      userId: req.user.id,
    },
  })
  const total = await prisma.project.count()
  res.json({
    data,
    total,
  })
})

router.post('/', protect, async (req: Req, res) => {
  const { name, desc, routes } = req.body
  const newUser = await prisma.project.create({
    data: {
      userId: req.user.id,
      name,
      desc,
      routes: {
        createMany: {
          data: routes,
        },
      },
    },
  })
  res.json({
    data: newUser,
    success: true,
  })
})

export default router
