const jwt=require("jsonwebtoken");
const fs=require("fs");
const { decode } = require("punycode");
const authorization=(req,res,next)=>{
let token =req.headers.authorization;
if(token){
const decode=jwt.verify(token,"masai");
if(decode){
// let back=fs.readFileSync("./aggregation.txt")
// console.log(back);
      const blacklist=JSON.parse(fs.readFileSync("./blacklist.json",{encoding:"utf-8"}));
      console.log(blacklist)
      if(blacklist.includes(token)){
        res.send({"msg":"login again"})
      }else{
        console.log(decode)
        req.body.userId=decode.userId,
        req.body.role=decode.role
        next();
      }
}
}
}

module.exports={
    authorization
}