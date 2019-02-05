import React, { Component } from 'react';
import axios from "axios";
import querystring from "query-string";
import LoginAndSignUp from './LoginAndSignUp';
import rocketLogo from '../img/rocket_logo.svg';

class NavBar extends Component {

  onLogin =  async e => {
    console.log('login')
    // e.preventDefault();
    // const response = await axios({
    //   method: 'POST',
    //   url: 'http://localhost:8000/api/login',
    //   crossDomain: true,
    //   data: querystring.stringify({
    //     username: this.username.current.value,
    //     password: this.password.current.value
    //   }),
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // });
    //
    // localStorage.setItem('token', response.data.token);
    // alert('ok');
    // window.location = '/';
  };

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light navbar-light-orange">
        <div className="container">
          <a href="#" className="navbar-brand text-secondary">
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

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-4">
                <a
                  className="nav-link"
                  href="#"
                  data-toggle="modal"
                  data-target="#loginModal"
                >
                  LOGIN
                </a>
              </li>
              <li>
                <button className="btn btn-orange btn-rounded" data-toggle="modal">
                  SIGN UP
                </button>
              </li>
            </ul>
          </div>
          <LoginAndSignUp onLogout={this.onLogin} />
        </div>
      </nav>
    );
  }
};

export default NavBar;
