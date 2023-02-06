const authorise=(role)=>{
    return (req,res,next)=>{
        if(role==req.body.role){
            next();
        }
        res.send("Not authorised")
    }
}
module.exports={
    authorise
}