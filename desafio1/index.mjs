// Importacion de la clase ProductManager
import ProductManager from "./productManager.mjs"
// Instancia de la clase ProductManager
const productManager = new ProductManager()

// -----------------------------------------------------

// Test 1 (Arreglo vacio en products)
console.log('Test 1 : ')
console.log(`Arreglo completo de productos : \n ${JSON.stringify(productManager.getProducts())}`)
// Test 2 (Agregar un producto al arreglo)
let testProduct = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
}
console.log('\n\nTest 2 : ')
productManager.addProduct(testProduct)
console.log(`Arreglo completo de productos : \n ${JSON.stringify(productManager.getProducts())}`)
// Test 3 (Error intentando agregar el mismo producto otra vez)
console.log('\n\nTest 3 : ')
productManager.addProduct(testProduct)
console.log(`Arreglo completo de productos : \n ${JSON.stringify(productManager.getProducts())}`)
// Test 4 (Busqueda de productos por ID)
console.log('\n\nTest 4 : ')
productManager.getProductById(1)
productManager.getProductById(10)
