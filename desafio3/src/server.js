import express from 'express';
import ProductManager from './productManager.js';

const productManager = new ProductManager('src/DB.json');
const app = express();
const PORT = 4000;

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get('/products', async (req, res) => {
    let limit = req.query ? parseInt(req.query.limit) : false
    let products = await productManager.getProducts(limit)
    let result = products 
        ?   {limit : limit, products : products}
        :   {products : 'No products Found'};
    res.json(result)
})
app.get('/products/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let product = await productManager.getProductById(id)
    let result = product
        ?   {product : product}
        :   {product : 'Product Not Found'};
    res.json(result)
})

app.listen(PORT, () => {
    console.log('Server running')
})

