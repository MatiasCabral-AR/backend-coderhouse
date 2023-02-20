import express from 'express';
import cartsRouter from './routes/cart.routes.js';
import productsRouter from './routes/products.routes.js';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor : ${error}`))



