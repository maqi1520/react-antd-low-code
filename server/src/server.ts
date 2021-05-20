import express from 'express'
import path from 'path'
import { PrismaClient, Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import { protect } from './middleware/auth'
import { errorHandler } from './middleware/errorHandler'
import jwt from 'jsonwebtoken'

const app = express()
const port = process.env.PORT || 4000
const prisma = new PrismaClient({
  errorFormat: 'pretty',
})

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const router = express.Router()
router.get('/users', protect, async (req, res) => {
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

router.post('/register', async (req, res) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  })
  if (user) {
    res.json({
      message: '该邮箱已经注册！',
      success: false,
    })
  }

  //生成salt的迭代次数
  const saltRounds = 10
  //随机生成salt
  const salt = bcrypt.genSaltSync(saltRounds)
  //获取hash值
  const hash = bcrypt.hashSync(password, salt)

  const newUser = await prisma.user.create({
    data: { email: email.toLowerCase(), password: hash },
    select: { id: true, name: true, email: true },
  })
  res.json({
    data: newUser,
    success: true,
  })
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  })
  if (!user) {
    res.json({
      success: false,
      message: '邮箱未注册！',
    })
  }

  //检查密码是否匹配
  const pwdMatchFlag = bcrypt.compareSync(password, user.password)
  if (pwdMatchFlag) {
    const token = jwt.sign(user, process.env.JWT_SECRET)
    res.cookie('token', token)
    res.json({
      success: true,
    })
  } else {
    res.json({
      success: false,
      message: '邮箱或者密码错误！',
    })
  }
})

app.use('/api', router)
app.use(errorHandler)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../client/dist')))
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
