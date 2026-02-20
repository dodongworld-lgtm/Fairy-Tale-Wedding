import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { createServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import { router } from './routes'

const app = express()
const httpServer = createServer(app)

export const io = new SocketServer(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

// Socket.io room join
io.on('connection', (socket) => {
  socket.on('join', (room: string) => {
    socket.join(room)
  })
})

app.use(helmet())
app.use(cors({ origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000' }))
app.use(morgan('dev'))
app.use(express.json())

app.use('/api', router)
app.get('/health', (_req, res) => res.json({ ok: true }))

// Export app for testing (without listen)
export default app

if (require.main === module) {
  const PORT = process.env.API_PORT || 4000
  httpServer.listen(PORT, () => console.log(`API running on :${PORT}`))
}
