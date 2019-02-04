import React, { Component } from "react";

import "./App.css";
import NavBar from "./components/NavBar";
import Landingtext from "./components/LandingText.js";
import cowLeft from "./img/left1.svg";
import cowRight from "./img/right1.svg";

class App extends Component {
  render() {
    return (
      <div>
        <img src={cowLeft} alt="" id="left1" />
        <img src={cowRight} alt="" id="right1" />
        <NavBar />
        <Landingtext />
      </div>
    );
  }
}

export default App;
