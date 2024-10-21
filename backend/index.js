import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
const PORT = process.env.PORT || 3000;


const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)

app.listen(PORT, () => {
    console.log("Servidor em fucionamento") 
})