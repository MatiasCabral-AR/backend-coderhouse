import {MongoProducts} from "../containers/MongoProducts.js"

const productsApi = new MongoProducts()
export async function getProducts(req, res){
    const response = await productsApi.getElements()
    if(response instanceof Error){
        res.status(404).send(`There was an error ${response}`)
    }else{
        res.json(response)
    }
}
export async function getProduct(req, res){
    const product = await productsApi.getById(req.params.pid)
    if(product instanceof Error){
        res.status(404).json({
            status : 404,
            response : 'ID not found',
            detail : cart === null ? 'Recently deleted' : cart.message
        })
    }else{
        res.json({
            status : 200,
            response : 'Found',
            product : product
        })
    }
}
export async function postProduct(req, res){
    const response = await productsApi.addElements(req.body)
    if(response instanceof Error){
        res.status(400).send('Something went wrong, please try again')
    }else{
        res.json({
            status : 200,
            newProd : response,
        })
    }
}
export async function putProduct(req, res){
    const id = req.params.pid
    const product = req.body
    const response = await productsApi.updateElement(id, product)
    if(response instanceof Error){
        res.status(400).send('Something went wrong, please try again')
    }else{res.json({
            status : 200,
            prevProduct : response,
            newProd : await productsApi.getById(id)
        })
    }
}
export async function deleteProduct(req, res){
    const response = await productsApi.deleteById(req.params.pid)
    if(response instanceof Error){
        res.status(404).send(`ID not found. Error : ${response.message}`)
    }else{res.json({
            status : 200,
            deletedProd : response
        })
    }
}