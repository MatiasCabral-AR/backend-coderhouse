export default class ProductManager{
    constructor(){
        this.products = [];
        this.keys = ["title", "description", "price", "thumbnail", "code", "stock"];
    }
    // Main functions
    addProduct(product){
        if (Object.keys(this.keys).toString() === product.keys.toString() && this.#findCode(product.code)) {
            this.#assignId(product);
            this.products.push(product);
            console.log(`The next product will be added : \n ${product}`)
        } else {
            console.log('Producto Invalido')
        }
        const res = Object.keys(this.keys).toString() === product.keys.toString() && Object.entries(this.products) 
            ? this.#assignId(product) && this.products.push(product) : false
        return res
    }

    getProducts(){
        return this.products
    }

    getProductByCode(code){
        const product = this.products.find( product => product.code === code )
        product ? console.log(product) : console.log('Producto no encontrado')
        Promise.all()
    }
    // Private Aux functions
    #assignId(product){
        this.products.length() === 0 ? product.id = 1 : product.id = this.products[-1].id + 1
        return product
    }

    #findCode(product){
        const codes = []
        Object.entries(this.products).forEach(([key, value]) => {
            if(key.toString() === 'code'){
                codes.push(value)
            }
        })
        return codes.includes(product.code) ? false : true
    }
}