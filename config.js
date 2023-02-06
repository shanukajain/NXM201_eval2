const mongo=require("mongoose");
const connection=mongo.connect("mongodb://127.0.0.1:27017/evaulation");


module.exports={connection}

