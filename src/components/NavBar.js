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
          <div class="row">
            <div class="col">
              <a href="#" className="navbar-brand text-secondary">
                <img src={rocketLogo} />
                THRIVE.
              </a>
            </div>

            <div class="col">
              <a href="#" className="navbar-brand text-secondary">
                Home
              </a>
              <a href="#" className="navbar-brand text-secondary">
                List
              </a>
            </div>

            <div class="col">
              <button
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarNav"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <LoginAndSignUp />
            </div>
          </div>

        </div>
      </nav>
    </div>
  );
};
