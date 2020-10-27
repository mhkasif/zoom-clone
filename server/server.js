const express=require("express");
const app=express()
const {v4:uuidv4} =require('uuid')
const http=require("http").createServer(app)
const io=require("socket.io")(http)
app.get('/',(req,res)=>{
    res.send("ello")
})
io.on("connection",socket=>{
    socket.on("join-room",(id)=>{
        socket.join(id)
        console.log("joined",id);
        socket.to(id).broadcast.emit("user-connected",id)
    })
})


http.listen(8080, () => {
    console.log("server has started....");
  });