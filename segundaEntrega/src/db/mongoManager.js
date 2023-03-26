import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2';

export class mongoManager {
    constructor(uri, collection, schema){
        this.uri = uri,
        this.collection = collection,
        this.schema = new mongoose.Schema(schema)
        this.schema.plugin(paginate)
        this.model = mongoose.model(this.collection, this.schema)
    }
    async setConection(){
        try {
            await mongoose.connect(this.uri)
            console.log('Mongo Connected')
        } catch (error) {
            console.log('Error on connection', error)
        }
    }
    async getElements(limit, page, query, sort){
        this.setConection()
        try {
            const elements = await this.model.paginate({query}, {limit:limit, page:page, sort:sort})
            return elements
        } catch (error) {
            console.log('Error getting elements', error)
        }
    }
    async getById(id){
        try {
            const element = await this.model.findById(id)
            return element
        } catch (error) {
            console.log('Error getting element', error)
        }
    }
    async updateElement(id, data){
        try {
            const response = this.model.findByIdAndUpdate(id, data)
            return response
        } catch (error) {
            console.log('Error updating element', error)
        }
    }
    async addElements(elements){ // Can add one or many elements
        try {
            const response = this.model.insertMany(elements)
            return response
        } catch (error) {
            console.log('Error adding elements', error)
        }
    }
    async deleteById(id){
        try {
            const response = this.model.findByIdAndRemove(id)
            return response
        } catch (error) {
            console.log('Error deleting element', error)
        }
    }
}