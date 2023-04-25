import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()



class MongoManager {
    constructor(uri, name, schema){
        this.uri = uri,
        this.collection = name,
        this.schema = schema
        this.model = mongoose.model(this.collection, this.schema)
    }
    async setConnection(){
        try {
            await mongoose.connect(this.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                dbName : 'business'
            })
        } catch (error) {
            console.log('Error on connection', error)
        }
    }
    async getElements(){
        this.setConnection()
        try {
            const elements = await this.model.find()
            return elements
        } catch (error) {
            return new Error(error.message)
        }
    }
    async getById(id){
        this.setConnection()
        try {
            const element = await this.model.findById(id)
            return element
        } catch (error) {
            return new Error(error.message)
        }
    }
    async updateElement(id, data){
        this.setConnection()
        try {
            const response = this.model.findByIdAndUpdate(id, data)
            return response
        } catch (error) {
            return new Error(error.message)
        }
    }
    async addElements(elements){ // Can add one or many elements
        this.setConnection()
        try {
            const response = this.model.insertMany(elements)
            return response
        } catch (error) {
            return new Error(error.message)
        }
    }
    async deleteById(id){
        this.setConnection()
        try {
            const response = this.model.findByIdAndRemove(id)
            return response
        } catch (error) {
            return new Error(error.message)
        }
    }

}

export default MongoManager