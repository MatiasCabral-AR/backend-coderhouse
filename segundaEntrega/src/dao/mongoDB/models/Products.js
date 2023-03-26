import {mongoManager} from '../../../db/mongoManager.js'

const schema = {
    description: {type : String, required: true, max : 100},
    title: {type : String, required : true, max : 40, unique : true},
    price: {type : Number, required : true},
    thumbnail: {type : String, required : true},
    code: {type : String, required : true, max : 8, unique : true},
    stock: {type : Number, required : true}
}

export class ProductsDaoMongo extends mongoManager{
    constructor(){
        super(process.env.DATABASE_URI, 'products', schema)
    }
}
