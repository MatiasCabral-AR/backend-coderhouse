import express from 'express';
import cartsRouter from './routes/cart.routes.js';
import productsRouter from './routes/products.routes.js';
import socketRouter from './routes/socket.routes.js';
import { engine } from 'express-handlebars';

// Dirname 
import {fileURLToPath} from 'url';
import { dirname, resolve } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url))


// Express server 
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', resolve(__dirname, './views'))



app.use('/static', express.static(__dirname + '/public'))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', socketRouter)

const PORT = 4000;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor : ${error}`))




