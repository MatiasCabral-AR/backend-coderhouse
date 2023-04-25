import {Router} from 'express';
import { getProduct, getProducts, postProduct, putProduct, deleteProduct } from '../controllers/products.js';

const productsRouter = new Router()

productsRouter.get('/', getProducts)
productsRouter.get('/:pid', getProduct)
productsRouter.post('/', postProduct)
productsRouter.put('/:pid', putProduct)
productsRouter.delete('/:pid', deleteProduct)

export default productsRouter