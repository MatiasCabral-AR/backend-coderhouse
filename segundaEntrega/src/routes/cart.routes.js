import { Router } from "express";
import MongoCarts from "../controllers/MongoCarts.js";

const cartsRouter = new Router()
const cartsApi = new MongoCarts()

cartsRouter.get('/', async (req, res) => {
    const {limit, page, query, sort} = req.query
    const carts = await cartsApi.getElements(limit, page, query, sort)
    if(carts instanceof Error){
        res.status(400).send('Something went wrong, please try again')
    }else{res.json(carts)}
})
cartsRouter.get('/:cid', async(req, res) => {
    const cart = await cartsApi.getById(req.params.cid)
    if(cart instanceof Error || cart === null){
        res.status(404).json({
            status : 404,
            response : 'ID not found',
            detail : cart === null ? 'Recently deleted' : cart.message
        })
    }else{res.json({
        status : 200,
        response : 'Found',
        cart : cart
    })}
})
cartsRouter.post('/', async(req, res)=> {
    let cart = Object.keys(req.body).length === 0 ? [] : req.body
    let response = await cartsApi.newCart(cart)
    if(response instanceof Error){
        res.status(400).send('Something went wrong, please try again')
    }else{res.json({
        status : 200,
        response : 'Cart added',
        newCart : response
    })}
})
cartsRouter.delete('/:cid', async (req, res)=> {
    const id = req.params.cid
    const deleted = await cartsApi.deleteById(id)
    if(deleted instanceof Error){
        res.status(400).send('ID not found')
    }else{res.json({
        status : 200,
        response : 'Deleted Successfully',
        deletedCart : deleted
    })}
})
cartsRouter.post('/:cid/products', async (req, res)=> {
    
    const product = req.body
    const cart = await cartsApi.addToCart(parseInt(req.params.cid), product)
    let result = cart === false ? [404,'Cart not found'] 
                : cart === null ? [400,'Something went wrong, please try again']
                : [200, found]
    res.status(result[0]).send({
        status : result[0],
        response : result[1],
        cart : cart
    })    
})
cartsRouter.delete('/:cid/products/:pid', async(req, res)=>{
    const cart = await cartsApi.getById(req.params.cid)
    if(cart instanceof Error){
        res.status(404).send('Cart not found')}
    const response = await cartsApi.deleteCartProduct(cart, req.params.pid)
    const result = response === false ? [404,'Product not found'] : [200,'Found']
    res.status(result[0]).send({
        status : result[0],
        response : result[1],
        cart : cart
    })
})

export default cartsRouter