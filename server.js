import express from 'express'
import dotenv from "dotenv"
import DbConnect from './utils/db.js'
import router from './routes/Router.js'
import cors from 'cors'

dotenv.config()
const app = express() 
// MongoDB is connected
DbConnect()

app.use(express.json())
app.use(cors({
  origin: ['https://todo-frontend-muneeb-mustafas-projects.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true,
}))

app.use('/api', router)

// Correctly reference process.env.PORT
app.listen(process.env.PORT, () => {
  console.log(`Todo App is running on port ${process.env.PORT}`)
})
