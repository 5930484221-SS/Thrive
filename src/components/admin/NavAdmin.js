import React, { Component } from "react";
import { Link } from "react-router-dom";

import rocketLogo from "../../img/rocket_logo.svg";
import UsernameAndLogoutAdmin from "./UsernameAndLogoutAdmin";

class NavAdmin extends Component {
  render() {
    return (
      <div>
        <nav
          className={"navbar navbar-expand-m navbar-light navbar-light-green"}
        >
          <div className="container">
            <a href="/" className={"navbar-brand text-white"}>
              <img src={rocketLogo} />
              THRIVE.
            </a>
            <ul className="nav navbar-nav ">
              <li className="nav-item ml-3">
                <Link to="/admin/dashboard" className="nav-link text-white">
                  Dashboard
                </Link>
              </li>
            </ul>
            <ul>
              <li className="nav-item ml-3">
                <Link to="/admin/searchUser" className="nav-link text-white">
                  Search user
                </Link>
              </li>
            </ul>
            <UsernameAndLogoutAdmin />
          </div>
        </nav>
      </div>
    );
  }
}

export default NavAdmin;
