import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import querystring from 'query-string';
import swal from 'sweetalert';

class UsernameAndLogoutAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

    localStorage.removeItem('token');
    localStorage.removeItem('is_admin');
    await swal('logged out');
    window.location = '/';
  };

  render() {
    console.log(this.props);
    return (
      <ul className="navbar-nav ml-auto ">
        <li className="nav-item dropdown ">
          <a
            href="#"
            className="nav-link dropdown-toggle text-white"
            data-toggle="dropdown"
          >
            <i className="fas fa-user ml-3 text-white" />{" "}
            {/* {localStorage.getItem("username")} */}
            Admin
          </a>
          <div className="dropdown-menu">
            <a href="#" onClick={this.onLogout} className="dropdown-item">
              <i className="fas fa-sign-out-alt " /> Logout
            </a>
          </div>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {}
)(UsernameAndLogoutAdmin);
