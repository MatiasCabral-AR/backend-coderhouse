import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import {Server as SocketServer} from 'socket.io';
import cors from 'cors';

// Dirname and dotenv
dotenv.config()
import {fileURLToPath} from 'url';
import { dirname, resolve } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url))
// Express server and Socket connection
const PORT = process.env.PORT
const app = express();
const server = app.listen(PORT , () => console.log(`Http server listening on port ${PORT}`))
const io = new SocketServer(server)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// Handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', resolve(__dirname, './views'))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', socketRouter)
// Socket events
io.on('connection', async socket => {
    console.log('Socket on Backend')
    const products = await fetch('http://localhost:4000/api/products')
                        .then(response => response.json())
    socket.emit('render-products', products)
    socket.on('new-product', async product => {
        fetch('http://localhost:4000/api/products', 
            { method : 'post',
              headers : {"Content-type" : "application/json"},
              body : JSON.stringify(product)})
        .then(response => response.json())
        .then(product => products.push(product) && socket.emit('render-products', products))
    })
    socket.on('delete-product', async id => {
        const url = `http://localhost:4000/api/products/${id}`;
        const producto = await fetch(url, {method : 'delete', headers : {"Content-type" : "application/json"}})
                              .then(response => response.json())
        let index = products.indexOf(products.find(product => product.id === producto.id))
        products.splice(index, 1)
        socket.emit('render-products', products)
    })
})
