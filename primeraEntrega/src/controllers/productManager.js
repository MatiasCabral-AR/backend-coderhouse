import GeneralManager from './generalManager.js';
import {writeFile} from 'fs/promises';
export default class ProductManager extends GeneralManager{
    constructor(){
            super('../models/products.json')
        }
    // ------------------------------------------------------------------------------------
    // Main functions
    async addProduct(product){
        const products = await this.getAll()
        if (this.#isValid(product, this.#keys(), products)) {// Chequeamos que el producto sea valido
            this.#assignId(product, products); // Le asignamos un id en base a los productos existentes
            try {
                products.push(product)
                await writeFile(this.path, JSON.stringify(products, null, 2))
                return product
            } catch (error) {
                console.log('Error while saving product, please try again.')
            }
        } else {
            return false
        }
    }
    async updateProduct(product){
        // Funcion updateProduct que sera usada en #findProductAndExecute
        async function foo(index, products, path) {
            if(index >= 0){
                const oldProduct = products[index]
                Object.entries(oldProduct).forEach(([key1, value1]) => { // Por cada campo del producto "viejo"
                    Object.entries(product).forEach(([key2, value2]) => { // Por cada campo del producto "nuevo"
                        key1.toString() === key2.toString() ? value1 = value2 : null // Si hay campos que coinciden, reemplazamos los valores
                    })
                })
                products[index] = product
                await writeFile(path, JSON.stringify(products, null, 2))
                return [product, oldProduct]
            }else{throw new Error}
        }
        let result = await this.findProductAndExecute(product, foo)
        return result
    }
    // ------------------------------------------------------------------------------------
    // Private Aux functions

    #assignId(product ,products){
        // Funcion de asignacion de id de un producto basado en el array de productos
        products.length === 0 ? product.id = 1 : product.id = products[products.length - 1].id + 1
        return product
    }
    #getCodes(products){
        // Funcion que devuelve un array con todos los codigos existentes de los productos
        const codes = []
        products.forEach(product => codes.push(product.code))
        return codes
    }
    #isValid(product, keys, products){
        // Funcion de control de validez de un producto dado.
        // Comprueba que el producto tenga todos los campos requeridos,
        // y que el codigo sea valido.
        if(Object.values(keys).toString() === Object.keys(product).toString() && this.#validCode(product.code, products)){ 
            return true
        }
        return false
    }
    #typeOf(productKey, productValue){
        const productKeyIndex = this.keys().indexOf(productKey)
        if(typeof productValue === this.#keyTypes()[productKeyIndex]){
            return true
        }
        return false
    }
    #keyTypes(){
        return ['string', 'string', 'number', 'string', 'string', 'number']
    }
    #keys(){
        return ["title", "description", "price", "thumbnail", "code", "stock"];
    }
    #checkValues(product){
        Object.entries(product).forEach(([key, value]) => {
            if(!this.#typeOf(key, value)){
                return false
            }
        })
        return true
    }
    #checkKeys(product){
        return Object.values(this.#keys()).toString() === Object.keys(product).toString()
    }
    #checkCode(code, products){
        // Funcion que controla que el codigo de un producto dado no
        // coincida con los codigos de los productos existentes
        return this.#getCodes(products).includes(code) ? false : true
    }
}