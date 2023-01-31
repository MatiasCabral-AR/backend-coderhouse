import express, { urlencoded } from 'express'
import * as http from 'http'
const PORT = 8080

// Creacion servidor con http
function httpServer(PORT){
    const server = http.createServer((req, res) => {
        res.end('This is my first server')
    })
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}
// Creacion servidor con express
function expressServer(PORT){
    const app = express()
    app.get('/', (req, res) => {
        res.send('This is my first server')
    })
    // Con params
    app.get('/home/:name', (req, res) => {
        res.send(`Hola : ${req.params.name}`)
    })
    // Con query
    app.use(express.urlencoded({extended : true})) // Declarar busqueda en url
    app.get('/home', (req, res) => {
        // Prueba de consulta : http://localhost:8080/home?name=Matias&lastName=Cabral
        let {name, lastName} = req.query
        res.send(`Hola ${name} ${lastName}`)
    })
    app.get('*', (req, res) => {
        res.send('Entraste a cualquier lado maestro')
    })
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}
expressServer(8080)