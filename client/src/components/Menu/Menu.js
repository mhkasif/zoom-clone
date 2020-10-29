import React, { useState } from "react";
import "./menu.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCoffee,
  faCommentAlt,
  faMicrophone,
  faMicrophoneSlash,
  faShieldAlt,
  faUserFriends,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
export default function Menu({ stream }) {
  const [muted, setMute] = useState(false);
  const [video, setVideo] = useState(false);
  console.log(stream);
  const setMuteUnmute = () => {
    console.log(stream?.getAudioTracks());
    const enabled = stream?.getAudioTracks()[0]?.enabled;
    if (enabled) {
      stream.getAudioTracks()[0].enabled = false;
      setMute(true);
    } else {
      stream.getAudioTracks()[0].enabled = true;
      setMute(false);
    }
  };
  const setPlayStop=()=>{
    console.log(stream?.getVideoTracks());
    const enabled = stream?.getVideoTracks()[0]?.enabled;
    if (enabled) {
      stream.getVideoTracks()[0].enabled = false;
      setVideo(true);
    } else {
      stream.getVideoTracks()[0].enabled = true;
      setVideo(false);
    }
  }
  return (
    <div className="menu-container">
      <div className="controller controller-left">
        <div onClick={setMuteUnmute} className="icon-container mute">
          <FontAwesomeIcon icon={muted ? faMicrophoneSlash : faMicrophone} />
          <p>{muted ? "Unmute" : "Mute"}</p>
        </div>
        <div onClick={setPlayStop} className="icon-container video">
          <FontAwesomeIcon icon={video ?   faVideo:faVideoSlash} />
          <p>{video ? "Start video" : "Stop video"}</p>
        </div>
      </div>
      <div className="controller controller-middle">
        <div className="icon-container security">
          <FontAwesomeIcon icon={faShieldAlt} />
          <p>Security</p>
        </div>
        <div className="icon-container participants">
          <FontAwesomeIcon icon={faUserFriends} />
          <p>Participants</p>
        </div>
        <div className="icon-container video">
          <FontAwesomeIcon icon={faCommentAlt} />
          <p>Chat</p>
        </div>
      </div>
      <div className="controller controller-right">
        <div className="icon-container text">
          <p className="red-text">Leave meeting</p>
        </div>
      </div>
    </div>
  );
}
