import axios from "axios";
import querystring from "query-string";
import React, { Component } from "react";

class NavBar extends Component {
  state = {};

  onLogout = async e => {
    e.preventDefault();
    const response = await axios({
      method: "POST",
      url: "http://localhost:8000/api/logout",
      crossDomain: true,
      data: querystring.stringify({
        token: localStorage.getItem("token")
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    localStorage.removeItem("token");
    alert("logged out");
    window.location = "/";
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Thive
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="listing">
                Listing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="create_course">
                Create Course
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={this.onLogout} href="/">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
