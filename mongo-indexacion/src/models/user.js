import { Schema, model } from 'mongoose';

const userCollection = 'users';

const userSchema = Schema({
    nombre : {type : String, index : true},
    apellido : String,
    email : {type : String, unique : true},
    password : String
})

const userModel = model(userCollection, userSchema)

export default userModel

