import { Router } from "express";
import CartManager from './../controllers/CartManager.js';

const cartsRouter = new Router()
const cartsApi = new CartManager()

// Routes

cartsRouter.get('/', async (req, res) => {
    const carts = await cartsApi.getAll()
    if(!carts){
        res.status(500).send('Internal Server Error')}
    res.json(carts)
})
cartsRouter.post('/', async (req, res => {
    const cart = cartsApi.newCart()
    res.json(cart)
}))
cartsRouter.get('/:id/products', async (req, res) => {
    const cart = await cartsApi.getById(parseInt(req.params.id))
    if(!cart){
        res.status(404).send('ID not found')}
    res.json(cart)
})