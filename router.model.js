const mongo=require("mongoose");
const userschema=mongo.Schema({
    email:String
    ,name:String
    ,role:{type:String,enum:['manager','user'],default:'user'}
    ,pass:String
})
const userModel=mongo.model("route_user",userschema);
module.exports={
    userModel
}