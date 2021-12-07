import express from 'express'
import { prisma } from '../prisma'
import { protect, Req } from '../middleware/auth'

const router = express.Router()
router.get('/', protect, async (req: Req, res) => {
  const data = await prisma.component.findMany({
    where: {
      userId: req.user.id,
    },
  })
  const total = await prisma.component.count()
  res.json({
    data,
    total,
  })
})

router.post('/', protect, async (req: Req, res) => {
  const { name, code, data } = req.body
  const component = await prisma.component.create({
    data: {
      userId: req.user.id,
      name,
      code,
      data,
    },
  })
  res.json({
    data: component,
    success: true,
  })
})

export default router
