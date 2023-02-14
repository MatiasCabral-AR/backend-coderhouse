import { Router } from "express";
import CartManager from "../controllers/cartManager.js";

const cartRouter = Router();
const cartManager = new CartManager();

cartRouter.post('/', async (req, res) => {
    let cart = await carritosApi.newCart();
    res.status(200).send({new_cart : cart})
})
cartRouter.get('/:cid', async (req, res) => {
    const id = parseInt(req.params.cid)
    const cart = await cartManager.getById(id)
    let response = cart
        ?   {cart : cart}
        :   {cart : 'Cart Not Found'}
    res.status(200).send(response)
})
cartRouter.delete('/:cid', async (req, res) => {
    const id = req.params.cid
    try {
        const deleted = await cartManager.deleteById(id)
        res.status(200).send({deleted_product : deleted})
    } catch (error) {
        res.status(400).send(`${error}`)
    }
})
cartRouter.get('/:id/products', async (req, res)=> {
    const cart = await cartManager.getById(req.params.id)
    if(cart){
        res.json({
            products : cart.products
        })
    }
    else{res.status(404).send('ID not found')}
    
})
cartRouter.post('/:cid/products/:pid', async (req, res) => {
    
})