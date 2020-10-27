
import React, { useEffect, useRef } from "react";
import socketIoClient from "socket.io-client";
import { Route, Switch } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./room.scss";

const Room = () => {
  const videoRef = useRef(null);
const {id}=useParams()
  useEffect(() => {
      const connectToNewUser=(l)=>{
          console.log("connectde",l);
      }
    const socket = socketIoClient("http://localhost:8080");
    socket.emit("join-room",id);
    socket.on("user-connected",(l)=>{
        connectToNewUser(l)
    })
    const videoStream = async () => {
      const video = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });
      videoRef.current.srcObject = video;
      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current.play()
        // videoRef.current.mute()
      });
      return video
    };
    const vid=videoStream();
    return ()=>{

socket.disconnect()
    }
  }, []);
  return (
<>
      <div className="video-container">
        <video className="video" ref={videoRef}></video>
      </div>

</>
  );
};

export default Room;
