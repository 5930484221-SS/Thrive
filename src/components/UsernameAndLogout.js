import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import querystring from 'query-string';

class UsernameAndLogout extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }


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
    console.log(this.props);
    return (
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <a
              className="nav-link"
              href="#"
              data-toggle="modal"
              data-target="#loginModal"
            >
              Username: {localStorage.getItem("username")}
            </a>
          </li>
          <li>
            <button className="btn btn-orange btn-rounded" onClick={this.onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {

  };
};

export default connect(
  mapStateToProps,
  { }
)(UsernameAndLogout);
