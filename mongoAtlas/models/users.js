import { Schema, model } from 'mongoose';

const usersCollection = 'users';

const userSchema = new Schema({
    firstName : String,
    lastName : String,
    email : {
        type : String,
        unique : true},
    age : Number
})
export const userModel = model(usersCollection, userSchema)