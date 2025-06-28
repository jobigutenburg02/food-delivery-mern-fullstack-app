import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true
    },
    email:{
        type:String, 
        required:true, 
        unique:true
    },
    password:{
        type:String, 
        required:true
    },
    cartData:{
        type:Object, 
        default:{}
    }
},{
    minimize:false // setting minimize to false helps mongoose in storing empty objects
  }
) 

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel