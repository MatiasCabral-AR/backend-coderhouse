import {Router} from 'express';
import MongoProducts from '../controllers/MongoProducts.js';

const productsRouter = new Router()
const productsApi = new MongoProducts()

productsRouter.get('/', async (req, res) => {
    // Filter establece un filtro para establecer un precio minimo (utiliza $gt)
    let {limit=10, page=1, filter=0, sort=0} = req.query
    const products = await productsApi.getElements(limit, page, filter, sort)
    if(products instanceof Error){
        res.status(404).send(`There was an error ${products}`)
    }else{
        res.json({
            status : 200,
            response: 'Found',
            products : products
        })
    }
})
productsRouter.get('/:pid', async (req, res)=> {
    const product = await productsApi.getById(req.params.pid)
    if(product instanceof Error){
        res.status(404).send(`ID not found. Error : ${product.message}`)
    }else{
        res.json({
            status : 200,
            response : 'Found',
            product : product
        })
    }
})
productsRouter.post('/', async (req, res)=> {
    const response = await productsApi.addElements(req.body)
    if(response instanceof Error){
        res.status(400).send('Something went wrong, please try again')
    }else{
        res.json({
            status : 200,
            response : response,
        })
    }
})
productsRouter.put('/:pid', async(req, res)=> {
    const id = req.params.id
    const product = req.body
    const response = await productsApi.updateElement(id, product)
    if(response instanceof Error){
        res.status(400).send('Something went wrong, please try again')
    }else{res.json({
            status : 200,
            response : response
        })
    }
})
productsRouter.delete('/:pid', async(req, res) => {
    const response = await productsApi.deleteById(req.params.id)
    if(response instanceof Error){
        res.status(404).send(`ID not found. Error : ${response.message}`)
    }else{res.json({
            status : 200,
            response : response
        })
    }
})

export default productsRouter