import { mongoManager } from "../../../db/mongoManager.js";

const schema = {
    user: {type : String, required: true, max : 40},
    email: {type : String, required : true, max : 40},
    message: {type : String, required : true}
}

export class MessagesDaoMongo extends mongoManager{
    constructor(){
        super(process.env.DATABASE_URI, 'messages', schema)
    }
}