import mongoose from "mongoose";
import orderModel from "./models/order.js";

async function start(){
    await mongoose.connect('mongodb+srv://raulmatiascabral:94aqbuCukNfpkb82@cluster0.wmzsk4r.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'pizzas'
      })
    // Creacion de datos
    /*
    await orderModel.insertMany([
        {name : "Muzzarella", size : "medium", price : "1500", quantity : "1"},
        {name : "Especial", size : "small", price : "1800", quantity : "2"},
        {name : "Anana", size : "large", price : "2400", quantity : "2"},
        {name : "Muzzarella", size : "medium", price : "1500", quantity : "3"},
        {name : "Napolitana", size : "small", price : "1200", quantity : "1"},
        {name : "Muzzarella", size : "small", price : "1000", quantity : "5"},
        {name : "Muzzarella", size : "large", price : "1900", quantity : "7"}
    ])
    await orderModel.insertMany([
        {name : "Especial", size : "medium", price : "2000", quantity : "1"},
        {name : "Especial", size : "small", price : "1500", quantity : "2"},
        {name : "Anana", size : "large", price : "2400", quantity : "2"},
        {name : "Anana", size : "medium", price : "2000", quantity : "3"},
        {name : "Napolitana", size : "medium", price : "1700", quantity : "1"},
        {name : "Especial", size : "small", price : "1500", quantity : "5"},
        {name : "Anana", size : "medium", price : "2000", quantity : "7"}
    ])
    */

    // Filtrar, ordenar y procesar datos
    /*
    const resultados = await orderModel.aggregate([
        {
            $match : {size : "medium"}
        },
        {
            $group : {_id: "$name", totalQuantity : {$sum:("$quantity")}, totalPrice: {$sum: "$price"}}
        },
        {
            $sort : {totalPrice : -1}
        },
        {
            $group : {_id:1, orders: {$push: "$$ROOT"}}
        },
        {
            $project: {
                "_id" : 0,
                orders : "$orders"
            }
        },
        {
            $merge : {
                into : "reports"
            }
        }
    ])
    */

    const resultados = await orderModel.paginate({size: "medium"}, {limit:2, page:1})
    console.log(resultados)
}   
start()