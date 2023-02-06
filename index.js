const express=require("express");
const { connection } = require("./config");
const { router } = require("./router");
const app=express();
app.use(express.json());

app.get("/",(req,res)=>{
res.send("home page");
})
app.use("/back",router);
app.listen(4500,async()=>{
   try {
    console.log("done");
    await connection;
    console.log("db done")
   } catch (error) {
    console.log()
   } 
})