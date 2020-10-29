import React, { useState } from "react";
import "./chat.scss";
import socketIoClient from "socket.io-client";
import { socket } from "../../pages/Room/Room";

const Chat = ({ messages }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("message", message);
    }
    setMessage("");
  };
  return (
    <div className="chat">
      <div className="chat__heading">
        <h2>Chat</h2>
      </div>
      <div className="chat__body">
        {messages.length > 0 &&
          messages.map((msg, id) => (
            <div key={id} className="msg-box">
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
