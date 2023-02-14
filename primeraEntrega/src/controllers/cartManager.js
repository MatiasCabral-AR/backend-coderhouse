import GeneralManager from './generalManager.js';
import { writeFile } from 'fs/promises';
export default class CartManager extends GeneralManager{
    constructor(){
        super('../models/carts.json')
    }
    // ------------------------------------------------------------------------------------
    // Main functions
    async addToCart(product, quantity, cartId){
        const cart = await this.getById(cartId)
        if(cart === false){
            return {message : 'Cart not found'}
        } 
        const carts = await this.getAll()
        const cartProduct = cart.products.find(cartProduct => cartProduct.id === product.id)
        if(cartProduct){ // Si el producto a agregar al carrito ya existe ...
            cartProduct.quantity += quantity // Se incrementa segun filmina N°57 de CoderHouse
            await this.updateCart(carts, cart, cartProduct)
            return cartProduct
        }
        // Si el producto a agregar al carrito no existe ...
        product.quantity = quantity
        carts.push(product)
        await writeFile(this.path, JSON.stringify(carts, null, 2))
        return product

    }
    async updateCart(carts, cart, cartProduct){
        const productIndex = cart.indexOf(cartProduct) // Obtenemos indice del producto
        const cartIndex = carts.indexOf(cart) // Obtenemos indice del carrito
        carts[cartIndex].products[productIndex] = cartProduct // Reemplazamos el producto en base a los indices
        await writeFile(this.path, JSON.stringify(carts, null, 2))
        return {message: 'Cart Updated'}
    }
    async createCart(){
        const carts = await this.getAll()
        const newCart = {
            id : 1,
            products : []
        }
        this.#assignId(newCart, carts)
        carts.push(newCart)
        await writeFile(this.path, JSON.stringify(carts, null, 2))
        return {message: 'Cart Created'}
    }
    // ------------------------------------------------------------------------------------
    // Private Aux functions

    #assignId(cart ,carts){ // Esta funcion sera reemplazada cuando se cambie de Herencia a Composicion
        // Funcion de asignacion de id de un producto basado en el array de productos
        carts.length === 0 ? cart.id = 1 : cart.id = carts[carts.length - 1].id + 1
        return cart
    }
}