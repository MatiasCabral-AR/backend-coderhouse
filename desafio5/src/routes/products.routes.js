import {Router} from 'express';
import MongoProducts from '../containers/MongoProducts.js';

const productsRouter = new Router()
const productsApi = new MongoProducts()

productsRouter.get('/', async (req, res) => {
    const response = await productsApi.getElements()
    if(response instanceof Error){
        res.status(404).send(`There was an error ${response}`)
    }else{
        res.json(response)
    }
})
productsRouter.get('/:pid', async (req, res)=> {
    const product = await productsApi.getById(req.params.pid)
    if(product instanceof Error){
        res.status(404).json({
            status : 404,
            response : 'ID not found',
            detail : cart === null ? 'Recently deleted' : cart.message
        })
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
            newProd : response,
        })
    }
})
productsRouter.put('/:pid', async(req, res)=> {
    const id = req.params.pid
    const product = req.body
    const response = await productsApi.updateElement(id, product)
    if(response instanceof Error){
        res.status(400).send('Something went wrong, please try again')
    }else{res.json({
            status : 200,
            prevProduct : response,
            newProd : await productsApi.getById(id)
        })
    }
})
productsRouter.delete('/:pid', async(req, res) => {
    const response = await productsApi.deleteById(req.params.pid)
    if(response instanceof Error){
        res.status(404).send(`ID not found. Error : ${response.message}`)
    }else{res.json({
            status : 200,
            deletedProd : response
        })
    }
})

export default productsRouter