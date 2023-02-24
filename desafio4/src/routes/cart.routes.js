import { Router } from "express";
import CartManager from './../controllers/CartManager.js';
import ProductManager from "../controllers/ProductManager.js";

const cartsRouter = new Router()
const cartsApi = new CartManager()
const productsApi = new ProductManager()

// Routes

cartsRouter.get('/', async (req, res) => {
    const carts = await cartsApi.getAll()
    if(!carts){
        return res.status(500).send('Internal Server Error')}
    res.json(carts)
})
cartsRouter.post('/', async (req, res) => {
    const cart = await cartsApi.newCart()
    res.json(cart)
})
cartsRouter.delete('/:cid', async (req, res) => {
    const response = await cartsApi.deleteById(parseInt(req.params.cid))
    if(!response){ 
        return res.status(404).send('ID not found')}
    res.json({
        cart_deleted : response
    })
})
cartsRouter.get('/:cid/products', async (req, res) => {
    const cart = await cartsApi.getById(parseInt(req.params.cid))
    if(!cart){
        return res.status(404).send('ID not found')}
    res.json(cart)
})
cartsRouter.post('/:cid/products', async (req, res) => {
    const request = {id : req.body.id, quantity : req.body.quantity}
    const product = await productsApi.getById(request.id)
    if(!product){
        return res.status(404).send('Product ID not found')}
    const response = await cartsApi.addToCart(request, parseInt(req.params.cid))
    if(!response){
        return res.status(404).send('Cart ID not found')}
    res.json(response)
})
cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
    const cart = await cartsApi.getById(parseInt(req.params.cid))
    const product = await productsApi.getById(parseInt(req.params.pid))
    if(!cart || !product){
        return res.status(404).send('Check product ID or cart ID')}
    const found = cart.products.some(element => element.id === product.id)
    if(!found){
        return res.status(404).send('Product is not in cart')}
    const result = await cartsApi.deleteCartProduct(cart, product)
    res.json({
        cart : result[0],
        deleted_product : result[1]
    })
})

export default cartsRouter