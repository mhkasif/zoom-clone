import React, { useEffect, useRef,useState } from "react";
import socketIoClient from "socket.io-client";
import { Route, Switch } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./room.scss";
import Peer from "peerjs";
import VideoScreen from "../../components/VideoScreen/VideoScreen";
import Chat from "../../components/Chat/Chat";
import Menu from "../../components/Menu/Menu";
export const socket = socketIoClient("http://localhost:5000");



const Room = () => {
  const videoRef = useRef(null);
  const userVideoRef = useRef(null);
  const { roomId } = useParams();
  const [messages,setMessages]=useState([])
  const [streamState,setStream]=useState(null)
console.log(streamState);
  useEffect(() => {
    console.log(videoRef.current);
    const peer = new Peer(undefined, {
      path: "/peerjs",
      host: "/",
      // port: "8080",
      port: "443",
    });
    const connectToNewUser = (userId,stream) => {
        const call=peer.call(userId,stream)
        call.on('stream',userVideoStream=>{
          const video=document.createElement("video")
          videoRef?.current.append(video)
            addVideoStream(video,userVideoStream)
        })

    };
    peer.on("open", (uid) => {
      console.log(roomId);
    socket.emit("join-room", roomId,uid);

    });
   const addVideoStream=(video,stream)=>{
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();

    });
   }
    const videoStream = async () => {
      const video=document.createElement("video")
      videoRef?.current.append(video)
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setStream(stream)
      addVideoStream(video,stream)
      peer.on('call', (call) => {

          call.answer(stream); // Answer the call with an A/V stream.
          call.on('stream',userVideoStream=>{
            const video=document.createElement("video")
            videoRef?.current.append(video)
            addVideoStream(video,userVideoStream)
        })
        })
      // videoRef.current.srcObject = video;
      // videoRef.current.addEventListener("loadedmetadata", () => {
      //   videoRef.current.play();
      //   videoRef.current.muted = true;
      // });
      socket.on("user-connected", (userId) => {
        connectToNewUser(userId,stream);
      });
      return stream;
    };
    socket.on("createMessage",message=>{
      console.log(message,'msg');
      // setMessages([...messages,{message,time:new Date().toLocaleTimeString()}])
      setMessages(prev=>[...prev,{message,time:new Date().toLocaleTimeString()}])
    })
    const vid = videoStream();
    console.log(vid)
    return () => {
      socket.disconnect();
    };
  }, [videoRef]);

  return (
    <>
      <div className="room-container">
        <VideoScreen>
        <div ref={videoRef}>
        </div>
         {/*  <video className="video" ref={videoRef}></video>
          <video className="video" ref={userVideoRef}></video> */}
        </VideoScreen>
        <Menu stream={streamState} />
        <Chat messages={messages} />
      </div>
    </>
  );
};

export default Room;
