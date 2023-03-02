import Manager from "./Manager.js";

import {writeFile} from 'fs/promises';
export default class ProductManager extends Manager{
    constructor(){
            super('./models/dbProducts.json')
        }
    // ------------------------------------------------------------------------------------
    // Main functions
    
    async addProduct(product){
        const products = await this.getAll()
        console.log(product)
        if (!this.#isValid(product, this.#keys(), products)) {// Chequeamos que el producto sea valido
           return false
        }
        this.assignId(product, products); // Le asignamos un id en base a los productos existentes
        products.push(product)
        await writeFile(this.path, JSON.stringify(products, null, 2))
        return product
    
    }
    async updateProduct(product, id){
        const products = await this.getAll()
        const index = products.indexOf(products.find(product => product.id === parseInt(id)))
        if(index < 0){
            return false}
        let oldProduct = products[index]
        Object.entries(oldProduct).forEach(([key1, value1]) => { // Por cada campo del producto "viejo"
            Object.entries(product).forEach(([key2, value2]) => { // Por cada campo del producto "nuevo"
                if(key1.toString() === key2.toString()){ // Si hay campos que coinciden, reemplazamos los valores
                    oldProduct[key1] = product[key2]
                }
            })
        })
        products[index] = oldProduct
        await writeFile(this.path, JSON.stringify(products, null, 2))
        return oldProduct
    }
    // ------------------------------------------------------------------------------------
    // Private Aux functions
    #getCodes(products){
        // Funcion que devuelve un array con todos los codigos existentes de los productos
        const codes = []
        products.forEach(product => codes.push(product.code))
        return codes
    }
    #isValid(product, keys, products){
        // Funcion de control de validez de un producto dado.
        // Comprueba que el producto tenga todos los campos requeridos,
        // y que el codigo sea valido. ATENCION ! EL PRODUCTO DEBE ESTAR EN ORDEN
        if(Object.values(keys).toString() === Object.keys(product).toString() && this.#checkCode(product.code, products)){ 
            return true
        }
        return false
    }
    #keys(){
        return ["title", "description", "price", "thumbnail", "code", "stock"];
    }
    #checkCode(code, products){
        // Funcion que controla que el codigo de un producto dado no
        // coincida con los codigos de los productos existentes
        return this.#getCodes(products).includes(code) ? false : true
    }
}