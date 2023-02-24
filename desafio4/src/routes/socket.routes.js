import ProductManager from "../controllers/ProductManager.js";
import { Router } from "express";

const socketRouter = new Router();
const productsApi = new ProductManager();

// Routes

socketRouter.get('/realTimeProducts', async(req, res) => {
    const products = await productsApi.getAll()
    res.render('home', {
        titulo : 'Pagina de mati',
        products: products
    })
})

export default socketRouter