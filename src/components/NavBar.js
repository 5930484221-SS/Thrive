import React, { Component } from "react";

import LoginAndSignUp from "./LoginAndSignUp";
import rocketLogo from "../img/rocket_logo.svg";
import LandingText from "./LandingText";
import UsernameAndLogout from "./UsernameAndLogout";

class NavBar extends Component {
  componentWillMount() {
    console.log(this.props.auth)
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-light navbar-light-orange">
          <div className="container">
            <a href="#" className="navbar-brand text-secondary">
              <img src={rocketLogo} />
              THRIVE.
            </a>

            <span>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item ml-3">
                  <a href="#" className="nav-link">Home</a>
                </li>

                <li className="nav-item ml-3">
                  <a href="#" className="nav-link">Lists</a>
                </li>

                <li className="nav-item ml-3">
                  <button
                    className="navbar-toggler"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                </li>
                {this.props.auth ? (
                  <li className="nav-item ml-3">
                    <UsernameAndLogout/>
                  </li>
                ) : (
                  <li className="nav-item ml-3">
                    <LoginAndSignUp/>
                  </li>
                )
                }
              </ul>
            </span>

          </div>
        </nav>
      </div>
    );
  }
};

export default NavBar;
