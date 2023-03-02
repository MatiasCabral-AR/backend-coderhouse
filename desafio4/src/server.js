import express from 'express';
import cartsRouter from './routes/cart.routes.js';
import productsRouter from './routes/products.routes.js';
import socketRouter from './routes/socket.routes.js';
import { engine } from 'express-handlebars';
import { Server as SocketServer} from 'socket.io';
import http from 'http';
import uest from 'uest';
import cors from 'cors';

// Dirname 
import {fileURLToPath} from 'url';
import { dirname, resolve } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url))


// Express server and io connection
const app = express();
const PORT = 4000;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)})
const io = new SocketServer(server)

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(__dirname + '/public'))

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', resolve(__dirname, './views'))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', socketRouter)

// Socket Events 
io.on('connection', async socket => {
    fetch('http://localhost:4000/api/products')
    .then(response => response.json())
    .then(products => socket.emit('update-products', products))
    console.log('Socket on Backend')
})





