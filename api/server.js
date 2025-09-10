import express from 'express'
import membersRoutes from './routes/members.js'
import logger from './middlewares/logger.js'
import { verifyToken } from './middlewares/verifyToken.js' // 🔐 nouveau middleware

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(logger)

// 🔐 Middleware Firebase Auth : vérifie le token et injecte req.user
app.use(verifyToken)

app.use('/api/members', membersRoutes)

app.listen(PORT, () => {
  console.log(`✅ API running on http://localhost:${PORT}`)
})