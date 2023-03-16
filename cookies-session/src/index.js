import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()

const app = express()


const SIGNED_COOKIE = process.env.CUKI
console.log(SIGNED_COOKIE)
app.use(cookieParser(SIGNED_COOKIE)) // Puedo implementar cookies en mi app
app.use(express.json())
app.use(urlencoded({ extended: true }))


app.listen(4000, () => console.log("Server on port 4000"))

app.get('/setCookie', (req, res) => {
    res.cookie('CookieCookie', 'Esto es una cookie', { maxAge: 30000, signed: true }).send('Cookie')
})

app.get('/getCookie', (req, res) => {
    res.send(req.signedCookies)
})