import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoutes.js'

const app = express()

app.use(express.json({limit : '50mb'}))
app.use(express.urlencoded({extended : true,limit : '50mb'}))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser())

app.use('/api/v1/users',userRouter)

export default app