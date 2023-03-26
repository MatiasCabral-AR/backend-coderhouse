import { cartsName, cartSchema } from "../models/MongoSchemas.js";
import MongoManager from "./MongoManager.js";
import dotenv from 'dotenv';
dotenv.config()


class MongoCarts extends MongoManager{
    constructor(){
        super(process.env.DATABASE_URI, cartsName, cartSchema)
    }
    async newCart(cart){
        this.setConnection()
        const response = await this.model.create(cart)
        return response
    }
    async addToCart(cartId, product){
        this.setConnection()
        const cart = await this.model.findById({_id : cartId})
        if(cart === null){
            return false
        }
        const response = await this.model.findByIdAndUpdate({_id : cartId}, {cart : cart.push(product)}, {new:true})
        return response
    }
    async deleteCartProduct(cart, productId){
        this.setConnection()
        const index = cart.products.map(element => element.id).indexOf(productId)
        if(index === -1){
            return false}
        cart.products.splice(index, 1)
        const response = await this.model.findByIdAndUpdate({_id : id}, {cart : cart})
        return response
    }
}

export default MongoCarts