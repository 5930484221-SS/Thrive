import React, { Component } from "react";
import LoginAndSignUp from "./LoginAndSignUp";
import rocketLogo from "../img/rocket_logo.svg";
import LandingText from "./LandingText";
import Home from "./Home";
import Lists from "./Lists";

export default props => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light navbar-light-orange">
        <div className="container">
          <a href="#" className="navbar-brand text-secondary">
            <img src={rocketLogo} />
            THRIVE.
          </a>
          <Home />
          <Lists />

          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <LoginAndSignUp />
        </div>
      </nav>
    </div>
  );
};

