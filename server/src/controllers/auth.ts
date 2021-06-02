import express from 'express'
import { prisma } from '../prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
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

authRouter.post('/signin', async (req, res) => {
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
    const token = jwt.sign(
      { ...user, password: undefined },
      process.env.JWT_SECRET
    )
    res.cookie('token', token, { httpOnly: true })
    res.json({
      token: token,
      success: true,
    })
  } else {
    res.json({
      success: false,
      message: '邮箱或者密码错误！',
    })
  }
})

authRouter.post('/signout', async (req, res) => {
  res.clearCookie('token')
  res.sendStatus(204)
})

export default authRouter
