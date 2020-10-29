const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");
const path=require("path")
// const cors=require("cors")
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
app.use("/peerjs", peerServer);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  // app.use(cors())
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "../client","build","index.html"));
  });
}
io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    console.log("joined", roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.on("message", (message) => {
      console.log(message);
      io.to(roomId).emit("createMessage", message);
    });
  });
});

//   app.use(express.static("../client/build"));

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log("server has started....");
});
