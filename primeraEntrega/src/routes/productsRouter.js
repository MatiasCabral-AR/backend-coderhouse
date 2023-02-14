import { Router } from "express";
import ProductManager from "../controllers/productManager";

const productsRouter = Router();
const productManager = new ProductManager();

productsRouter.get('/', async (req, res) => {
    let limit = req.query ? parseInt(req.query.limit) : false
    let products = await productManager.getProducts(limit)
    let result = products 
        ?   {limit : limit, products : products}
        :   {products : 'No products Found'};
    res.json(result)
})
productsRouter.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let product = await productManager.getProductById(id)
    let result = product
        ?   {product : product}
        :   {product : 'Product Not Found'};
    res.json(result)
})

export default productsRouter;

