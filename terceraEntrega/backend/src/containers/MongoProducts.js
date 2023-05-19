import MongoManager from "./MongoManager.js";
import { productName, productSchema } from "../models/MongoSchemas.js";
import dotenv from 'dotenv';
dotenv.config()

export class MongoProducts extends MongoManager{
    constructor(){
        super(process.env.DATABASE_URI, productName, productSchema)
    }
}
export default MongoProducts