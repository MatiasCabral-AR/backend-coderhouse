import { Router } from "express";
import ProductManager from '../controllers/ProductManager.js';

const productsRouter = new Router()
const productsApi = new ProductManager()

// Routes

productsRouter.get('/', async (req, res) => {
    const products = await productsApi.getAll()
    res.json(products)
})
productsRouter.get('/:id', async (req, res) => {
    const product = await productsApi.getById(parseInt(req.params.id))
    if(!product){
        return res.status(404).send('ID not found')}
    res.json(product)
})
productsRouter.post('/', async (req, res) => {
    const product = await productsApi.addProduct(req.body)
    if(!product){
        return res.status(400).send('Invalid product')}
    res.json(product)
})
productsRouter.put('/:id', async (req, res) => {
    const id = req.params.id
    const product = req.body
    const result = await productsApi.updateProduct(product, id)
    if(!result){
        return res.status(404).send('ID not found')}
    res.json(result)
})
productsRouter.delete('/:id', async (req, res) => {
    const removed = await productsApi.deleteById(parseInt(req.params.id))
    if(!removed){
        return res.status(404).send('ID not found')}
    res.json(removed)
})

export default productsRouter
