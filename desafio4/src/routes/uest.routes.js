import { Router } from "express";

const uestRouter = new Router();

// Routes
uestRouter.get('/uestProducts', async(req, res) => {
    const response = await req.uest({
        method : 'GET',
        url : '/api/products'
    })
    const products = response.body
    res.render('home', {products})
})
uestRouter.post('/uestProducts', async(req, res)=> {
    let {title, price, description, thumbnail, code, stock} = req.body
    price = parseInt(price)
    stock = parseInt(stock)
    await req.uest({
        method : 'POST',
        url : '/api/products',
        body : {title, description, price, thumbnail, code, stock}
      }, (er, resp, body) => {
        if (er) {
          // Deal with specific "Forbidden" error
          if (er.status === 400) {
            return res.render('home', {error: "Invalid Product"})
          }
        }
    
        console.log(resp.body)
    
          
        res.redirect('/realTimeProducts')
      })
})

export default uestRouter