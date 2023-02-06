const express=require("express");
const { userModel } = require("./router.model");
const bcrypt=require("bcrypt");
const fs=require("fs");
const jwt=require("jsonwebtoken");
const { json } = require("express");
const { authorization } = require("./Authorisation");
const { authorise } = require("./authorise");
const router=express.Router();
router.use(express.json());

router.get("/",async(req,res)=>{
    let data=await userModel.find();
    res.send(data);
})
router.post("/signup",async(req,res)=>{
    const {email,name,role,pass}=req.body;
    try {
        bcrypt.hash(pass,5,async(err,password)=>{
            if(!err){
            let payload=new userModel({"email":email,"pass":password,"role":role,"name":name});
            await payload.save();
            res.send("done");
            }else {
                res.status("400").send("error")
            }
        })
       
    } catch (error) {
        res.status("400").send("error")
       
    }
})
router.post("/login",async(req,res)=>{
    let {email,pass}=req.body;
    try {
        console.log(email,pass);
        // res.send("done")
        let user=await userModel.find({"email":email});
        console.log(user[0])
        bcrypt.compare(pass,user[0].pass,(err,result)=>{
            if(result){
                let token=jwt.sign({userId:user[0]._id,role:user[0].role},"masai",{expiresIn:"60s"})
                let rtoken=jwt.sign({userId:user[0]._id,role:user[0].role},"masai1",{expiresIn:"300s"});
                res.send({"msg":"done","token":token,"rtoken":rtoken});
            }
        })
    } catch (error) {
        console.log(error)
        res.status("400").send("error")

    }
})
router.get("/refrestoken",(req,res)=>{
    const token=req.headers.authorization
    const decode=jwt.verify(token,"masai1");
if(decode){
    let token1=jwt.sign({userId:decode.userId,role:decode.role},"masai",{expiresIn:"60s"})
    res.send({"msg":token1});
}else{
    res.send({"msg":"login again"});
}

})
router.use(authorization);
router.get("/logout",(req,res)=>{
    const token=req.headers.authorization;
    console.log(token);
    const blacklist=JSON.parse(fs.readFileSync("./blacklist.json",{encoding:"utf-8"}));
    blacklist.push(token);
    fs.writeFileSync("./blacklist.json",JSON.stringify(blacklist));
    res.send("logout");
})
router.get("/goldrate",(req,res)=>{
    res.send("you are user")
})
router.get("/userstats",authorise("manager"),(req,res)=>{
    res.send("welcome");
})




module.exports={
    router
}