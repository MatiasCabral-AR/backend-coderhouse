import {promises as fs} from 'fs'
import { writeFileSync, readFileSync } from 'fs';
export default class ProductManager{
    constructor(path){
        this.path = path;
        this.#autoExecute()
        }
    // Esta funcion es de ejecucion automatica y se encarga de comprobar si existe o no el archivo y tambien si esta vacio
    async #autoExecute(){
        try {
            const file = readFileSync(this.path, 'utf-8')
            if(file.length === 0) throw new Error('File empty')
        } catch (error) {
            console.log(error.message)
            writeFileSync(this.path, JSON.stringify(Array.from(0), null, 2))
            console.log('\nFile created or replaced')
        }
    }
    // ------------------------------------------------------------------------------------
    // Main functions
    async addProduct(product){
        const products = await this.getProducts()
        if (this.#isValid(product, this.#keys(), products)) {
            this.#assignId(product, products);
            try {
                products.push(product)
                await fs.writeFile(this.path, JSON.stringify(products, null, 2))
                return product
            } catch (error) {
                console.log('Error while saving product, please try again.')
            }
        } else {
            return false
        }
    }
    async deletebyId(id){
        async function foo(index, products, path){
            if(index >= 0){
                products.splice(index, 1)
                await fs.writeFile(path, JSON.stringify(products, null, 2))
                return true
            }else{throw new Error}
        }
        let result = await this.#findProductAndExecute({id : id}, foo)
        return result
    }
    async getProducts(limit){
        try {
            const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            if(limit){
                let result = products.slice(0, limit)
                return result
            }
            else{
                return products
            }
        } catch (error) {
            return false
        }
    }

    async getProductById(id, products = false){
        if(!products) products = await this.getProducts()
        let result = products.find( product => product.id === id ) ? true : false
        return result
    }
    async updateProduct(product){
        async function foo(index, products, path) {
            if(index >= 0){
                const oldProduct = products[index]
                Object.entries(oldProduct).forEach(([key1, value1]) => {
                    Object.entries(product).forEach(([key2, value2]) => {
                        key1.toString() === key2.toString() ? value1 = value2 : null
                    })
                })
                products[index] = product
                await fs.writeFile(path, JSON.stringify(products, null, 2))
                return [product, oldProduct]
            }else{throw new Error}
        }
        let result = await this.#findProductAndExecute(product, foo)
        return result
    }
    // ------------------------------------------------------------------------------------
    // Private Aux functions
    #assignId(product ,products){
        products.length === 0 ? product.id = 1 : product.id = products[products.length - 1].id + 1
        return product
    }
    #getCodes(products){
        const codes = []
        products.forEach(product => codes.push(product.code))
        return codes
    }
    #isValid(product, keys, products){
        if(Object.values(keys).toString() === Object.keys(product).toString() && this.#validCode(product.code, products)){ 
            return true
        }
        return false
    }
    #keys(){
        return ["title", "description", "price", "thumbnail", "code", "stock"];
    }
    #validCode(code, products){
        return this.#getCodes(products).includes(code) ? false : true
    }
    // Funcion generica de busqueda de indice y ejecucion
    async #findProductAndExecute(product, foo){
        const products = await this.getProducts()
        const index = products.map(element => element.id).indexOf(product.id)
        try {
            let result = await foo(index, products, this.path)
            return result
        } catch (error) {
            return false
        }
    }
}