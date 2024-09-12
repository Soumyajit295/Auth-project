import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoutes.js'

const app = express()

app.use(express.json({limit : '50mb'}))
app.use(express.urlencoded({extended : true,limit : '50mb'}))
app.use(cors({
    origin: 'https://auth-project-frontend-k9wa.onrender.com',
    credentials: true
}));

app.use(cookieParser())

app.use('/api/v1/users',userRouter)

export default app