import { Router } from "express";

const socketRouter = new Router()

// Router
socketRouter.get('/realTimeProducts', async(req, res) => {
    res.render('home', {})
})

export default socketRouter