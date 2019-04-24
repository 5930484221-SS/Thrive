import React, { Component } from "react";
import { Link } from "react-router-dom";

import rocketLogo from "../../img/rocket_logo.svg";
import UsernameAndLogoutAdmin from "./UsernameAndLogoutAdmin";

class NavAdmin extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
          <div className="container">
            <a href="/admin/dashboard" className="navbar-brand text-white">
              <img src={rocketLogo} />
              THRIVE.
            </a>
            <button
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarNav"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div id="navbarNav" className="collapse navbar-collapse">
              <ul className="nav navbar-nav ">
                <li className="nav-item ml-3">
                  <Link to="/admin/dashboard" className="nav-link text-white">
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item ml-3">
                  <Link to="/admin/searchUser" className="nav-link text-white">
                    Search user
                  </Link>
                </li>
              </ul>
              <UsernameAndLogoutAdmin />
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavAdmin;
