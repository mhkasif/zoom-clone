const express=require("express");
const app=express()
const {v4:uuidv4} =require('uuid')
const server=require("http").createServer(app)
const io=require("socket.io")(server)
const {ExpressPeerServer}=require("peer")
const peerServer=ExpressPeerServer(server,{
    debug:true
})

app.use("/peerjs",peerServer)
app.get('/',(req,res)=>{
    res.send("ello")
})
io.on("connection",socket=>{
    socket.on("join-room",(roomId,userId)=>{
        socket.join(roomId)
        console.log("joined",roomId);
        socket.to(roomId).broadcast.emit("user-connected",userId);
        socket.on("message",message=>{
            console.log(message);
            io.to(roomId).emit("createMessage",message)
        })
    })
})


server.listen(8080, () => {
    console.log("server has started....");
  });