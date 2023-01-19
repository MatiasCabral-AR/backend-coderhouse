export default class ProductManager{
    constructor(){
        this.products = [];
    }
    static #keys = ["title", "description", "price", "thumbnail", "code", "stock"];
    // Main functions
    addProduct(product){
        if (this.#isValid(product)) {
            this.#assignId(product);
            this.products.push(product);
            console.log(`The next product will be added : \n ${JSON.stringify(product)}`)
        } else {
            console.log('Error : Invalid Product')
        }
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        const product = this.products.find( product => product.id === id )
        product ? console.log(product) : console.log('Producto no encontrado')
    }
    // Private Aux functions
    #assignId(product){
        this.products.length === 0 ? product.id = 1 : product.id = this.products[-1].id + 1
        return product
    }

    #validCode(product){
        const codes = []
        Object.entries(this.products).forEach(([key, value]) => { // Desarmamos el Array de objetos y los separamos en clave-valor
            if(key.toString() === 'code'){ // Si la clave es code guardamos su valor en un array
                codes.push(value)
            }
        })
        return !codes.includes(product.code) ? false : true // Si el nuevo codigo no se encuentra en el array previamente creado (Invertimos el resultado del includes)
    }
    #isValid(product){
        // Si las keys predefinidas coinciden con las keys del producto que entra y validCode() retorna true. El producto es valido. 
        if(Object.values(this.#keys).toString() === Object.keys(product).toString() && this.#validCode(product.code)){
            return true
        }
        return false
    }
}