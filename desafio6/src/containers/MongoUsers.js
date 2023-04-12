import MongoManager from "./MongoManager.js";
import { usersName, usersSchema } from "../models/MongoSchemas.js";
import dotenv from 'dotenv';
dotenv.config()

export class MongoUsers extends MongoManager{
    constructor(){
        super(process.env.DATABASE_URI, usersName, usersSchema)
    }
    async findOne(obj){
        this.setConnection()
        const response = await this.model.findOne(obj)
        return response
    }
    async create(obj){
        this.setConnection()
        const response = await this.model.insertMany(obj)
        return response
    }
    async findOneAndUpdate(obj, newObj, options){
        this.setConnection()
        const response = await this.model.findOneAndUpdate(obj, newObj, options)
        return response
    }
}
