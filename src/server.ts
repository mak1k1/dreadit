require('./config')
import http from 'http'
import express, { Express } from 'express'
import morgan from 'morgan'
import postRoutes from './routes/posts'
import userRoutes from './routes/users'

const router: Express = express()

router.use(morgan('dev'))
router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'origin, X-Requested-With,Content-Type,Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST')
    return res.status(200).json({})
  }
  next()
})

/** Routes */
router.use('/posts', postRoutes)
router.use('/users', userRoutes)

/** Error handling */
router.use((req, res, next) => {
  const error = new Error('not found')
  return res.status(404).json({
    message: error.message,
  })
})

/** Server */
const httpServer = http.createServer(router)
const PORT: any = process.env.PORT ?? 3000
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
)
