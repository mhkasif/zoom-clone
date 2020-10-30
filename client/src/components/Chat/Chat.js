import React, { useEffect, useRef, useState } from "react";
import "./chat.scss";
import socketIoClient from "socket.io-client";
import { socket } from "../../pages/Room/Room";
import { useStateValue } from "../../Hooks/StateProvider";

const Chat = ({ messages }) => {
  const [message, setMessage] = useState("");
  const [{user},dispatch]=useStateValue()
  const chatBodyRef=useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {

      socket.emit("message", message,user);
    }
    setMessage("");
  };
  useEffect(()=>{
    // chatBodyRef.current.scrollToBottom()
  },[])
  return (
    <div className="chat">
      <div className="chat__heading">
        <h2>Chat</h2>
      </div>
      <div className="chat__body" ref={chatBodyRef}>
        {messages.length > 0 &&
          messages.map((msg, id) => (
            <div key={id} className="msg-box">
            <span className="username">{msg.username||"User"}</span>
              {msg?.message}
              <span>{msg?.time}</span>
            </div>
          ))}
      </div>

      <div className="chat__footer-input">
        <form>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Type your message..."
          />
          <button onClick={handleSubmit} type="submit"></button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
