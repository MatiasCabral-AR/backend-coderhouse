import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user : 'cabralraulmatias@gmail.com',
        pass: process.env.GMAIL_PASSWORD,
        auth: 'LOGIN'
    }
})

app.get('/mail', async(req, res)=> {

})

app.listen(4000, () => {
    console.log('Connected')
})