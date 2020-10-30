import logo from "./logo.svg";
import "./App.scss";
import React, { useEffect, useRef } from "react";
import socketIoClient from "socket.io-client";
import { Route, Switch } from "react-router-dom";
import Room from "./pages/Room/Room";
import Home from "./pages/Home/Home";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="rooms/:roomId" exact component={Room} />
      </Switch>
    </div>
  );
}

export default App;
