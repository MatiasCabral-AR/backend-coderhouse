import Manager from "./Manager.js";
import { writeFile } from 'fs/promises';

export default class CartManager extends Manager{
    constructor(){
        super('../models/dbCarts.json')
    }
    // ------------------------------------------------------------------------------------
    // Main functions

    async newCart(){
        const carts = await this.getAll()
        let cart = {
            id : 1,
            products : []
        }
        cart = this.assignId(cart, carts)
        this.saveCart(cart)
        return cart
    }
    async saveCart(cart){
        const carts = await this.getAll()
        carts.push(cart)
        try {
            await this.saveCarts(carts)
            return true
        } catch (error) { return false }
    }
    async saveCarts(carts){
        try {
            await writeFile(this.path, JSON.stringify(carts, null, 2))
            return true
        } catch (error) { return false }
    }
    async addToCart(productId, quantity, cartId){
        const cart = await this.getById(cartId)
        if(cart === false){
            return false
        } 
        const carts = await this.getAll()
        var const cartProduct = cart.products.find(cartProduct => cartProduct.id === productId)
        if(cartProduct){ // Si el producto a agregar al carrito ya existe ...
            cartProduct.quantity += quantity // Se incrementa segun filmina N°57 de CoderHouse
            await this.updateCart(carts, cart, cartProduct)
        }
        else{ // Si el producto a agregar al carrito no existe ...
            product.quantity = quantity
            carts.push(product)
            await this.saveCarts(carts)
        }
        return product
    }
    async updateCart(carts, cart, cartProduct){
        const productIndex = cart.indexOf(cartProduct) // Obtenemos indice del producto
        const cartIndex = carts.indexOf(cart) // Obtenemos indice del carrito
        if(cartIndex < 0 || productIndex < 0){
            return false
        }
        carts[cartIndex].products[productIndex] = cartProduct // Reemplazamos el producto en base a los indices
        await this.saveCarts(carts)
        return cart
    }
    async deleteCartProduct(cartId, product){
        let cart = await this.getById(cartId)
        if(cart === null){
            return false
        }
        let newCart = cart.filter(element => element.id =! product.id)
        await this.saveCart(newCart)
        return [cart, product]
    }
}
