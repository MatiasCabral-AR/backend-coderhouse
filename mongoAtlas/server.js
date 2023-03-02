import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.routes.js';
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const PORT = 4000;
const DATABASE_URL = process.env.DATABASE_URI

mongoose.connect(DATABASE_URL)
    .then(console.log('MongoAtlas connected'))
    .catch(error => console.log(error.message))

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use('/', userRouter)

app.listen(PORT, () => {
    console.log('Server running')
})