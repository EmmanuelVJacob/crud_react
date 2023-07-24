import express from 'express';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { notFound,errorHandler } from './middleware/errorMIddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';


connectDB()

dotenv.config()
const port = process.env.port || 5000

const  app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoutes)

app.use(notFound)
app.use(errorHandler)

app.get('/' , (req,res)=>{
    res.send('app is ready')
})

app.listen(port,()=>console.log(`server started in port ${port}`))