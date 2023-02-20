import Manager from "./Manager.js";
import { writeFile } from 'fs/promises';

export default class CartManager extends Manager{
    constructor(){
        super('./models/dbCarts.json')
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
        console.log(cart)
        return cart
    }
    async saveCart(cart){
        const carts = await this.getAll()
        const exist = carts.find(element => element.id === cart.id)
        const index = carts.indexOf(exist)
        if(index < 0){
            carts.push(cart)}
        else{
            carts[index] = cart}
        await this.saveCarts(carts)
        return true
    }
    async saveCarts(carts){
        try {
            await writeFile(this.path, JSON.stringify(carts, null, 2))
            return true
        } catch (error) { return false }
    }
    async addToCart(product, cartId){
        const cart = await this.getById(cartId)
        if(cart === false){
            return false
        } 
        const carts = await this.getAll()
        const cartProduct = cart.products.find(cartProduct => cartProduct.id === product.id)
        if(cartProduct){ // Si el producto a agregar al carrito ya existe ...
            cartProduct.quantity += product.quantity // Se incrementa segun filmina N°57 de CoderHouse
            product = await this.updateCart(cart, cartProduct, carts)
        }
        else{ // Si el producto a agregar al carrito no existe ...
            cart.products.push(product)
            await this.saveCart(cart)
        }
        return product
    }
    async updateCart(cart, cartProduct, carts){
        if(!carts){
            carts = await this.getAll()
        }
        const productReference = cart.products.find(element => element.id === cartProduct.id)
        const productIndex = cart.products.indexOf(productReference) // Obtenemos indice del producto
        const cartReference = carts.find(element => element.id === cart.id)
        const cartIndex = carts.indexOf(cartReference) // Obtenemos indice del carrito
        if(cartIndex < 0 || productIndex < 0){
            return false
        }
        carts[cartIndex].products[productIndex] = cartProduct // Reemplazamos el producto en base a los indices
        await this.saveCarts(carts)
        return cart
    }
    async deleteCartProduct(cart, product){
        console.log(product.id)
        console.log(cart.products)
        cart.products = cart.products.filter(element => element.id !== product.id)
        await this.saveCart(cart)
        return [cart, product]
    }
}
