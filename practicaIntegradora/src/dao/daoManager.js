const db = process.env.DBSELECTOR
// db es el selector de base de datos
export const getProductsManager = async () => {
    const productsModel = 
        db === 1 ? await import('./mongoDB/models/Products.js')
                 : await import('./fileSystem/models/Products.js')
    return productsModel
}

export const getMessageManager = async () => {
    const productsModel = 
        db === 1 ? await import('./mongoDB/models/Message.js')
                 : await import('./fileSystem/models/Message.js')
    return productsModel
}

export const getCartsManager = async () => {
    const productsModel = 
        db === 1 ? await import('./mongoDB/models/Carts.js')
                 : await import('./fileSystem/models/Carts.js')
    return productsModel
}