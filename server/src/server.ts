import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middleware/errorHandler'
import auth from './controllers/auth'
import user from './controllers/user'
import project from './controllers/project'
import component from './controllers/component'
import * as env from 'dotenv'

env.config()

const app = express()
const port = process.env.PORT || 4000

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/project', project)
app.use('/api/component', component)

app.use(errorHandler)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../client/dist')))
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../client/dist', 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
