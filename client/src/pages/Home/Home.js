import React, { useState } from "react";
import "./home.scss";
import { uuid } from "uuid";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useStateValue } from "../../Hooks/StateProvider";
import { actionTypes } from "../../Hooks/reducer";

const Home = () => {
  const [username, setUsername] = useState("");
  const [{},dispatch]=useStateValue()
  const history = useHistory();

const submit=(e)=>{
  e.preventDefault()
  console.log(username);
  dispatch({
    type:actionTypes.SET_USER,
    user:username
  })
  history.push(`/rooms/${uuidv4()}`)
}
  return (

      <div className="home">
        <div className="home-card">
          <h3>Welcome To Xoom App</h3>
          <form>
          <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" className={username?"":"disabled"} onClick={submit}>Submit</button>
          </form>
        </div>
      </div>

  );
};

export default Home;
