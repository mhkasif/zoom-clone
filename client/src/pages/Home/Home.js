import React from "react";
import "./home.scss";
import {uuid} from "uuid";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  return (
    <Link to={`rooms/${uuidv4()}`}>
      <div className="home">
        <div className="home-btn">
        <p>
        Button
        </p>
        </div>
      </div>
    </Link>
  );
};

export default Home;
