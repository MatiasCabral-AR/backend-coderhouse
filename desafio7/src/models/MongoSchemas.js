import { Schema, model } from "mongoose";
import paginate from 'mongoose-paginate-v2';

const productName = 'products'
const productSchema = new Schema({
    description: {type : String, required: true, max : 100},
    title: {type : String, required : true, max : 40, unique : true},
    price: {type : Number, required : true},
    thumbnail: {type : String, required : true},
    code: {type : String, required : true, max : 8, unique : true},
    stock: {type : Number, required : true}
})
productSchema.plugin(paginate)
const cartsName = 'carts'
const cartSchema = new Schema({
    products : [{type : Object, required : true}]
})
cartSchema.plugin(paginate)

const usersName = 'users'
const usersSchema = new Schema({
    username : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    email : {type : String},
    twitterId : {type : String, sparse : true},
    fullName : {type : String},
    role :  {type : String}
})

export {productName, productSchema, cartsName, cartSchema, usersName, usersSchema}