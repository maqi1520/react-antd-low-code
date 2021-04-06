import express from 'express'
import path from 'path'
const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const router = express.Router()
router.get('/users', (req, res) => {
  res.json([
    {
      name: '123',
    },
  ])
})

app.use('/api', router)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../client/dist')))
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
