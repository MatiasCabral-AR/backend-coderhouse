import userModel from "./models/user.js";
import mongoose from "mongoose";

async function main(){
    await mongoose.connect('mongourl')
    const response = await userModel.find().explain('executionState')
    console.log(response)
}

main()