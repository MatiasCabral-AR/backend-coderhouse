import MongoManager from "./MongoManager.js";
import { productName, productSchema } from "../models/MongoSchemas.js";
import dotenv from 'dotenv';
dotenv.config()

export class MongoProducts extends MongoManager{
    constructor(){
        super(process.env.DATABASE_URI, productName, productSchema)
    }
    async getElements(limit, page, filter, sort){
        super.setConnection()
        try {
            const elements = await this.model.paginate({price : {$gt : filter}}, {limit:limit, page:page, sort:{price : sort}})
            console.log(elements)
            return elements
        } catch (error) {
            return new Error(error.message)
        }
    }
}
export default MongoProducts