import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'query-string';

class LoginAndSignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  onUsernameChange(text) {
    this.setState({
      username: text.target.value
    })
  }

  onPasswordChange(text) {
    this.setState({
      password: text.target.value
    })
  }

  onSubmit = async e => {
    e.preventDefault();
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/login',
      crossDomain: true,
      data: querystring.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    localStorage.setItem('token', response.data.token);
    alert('ok');
    window.location = '/';
  };

  render() {
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
              LOGIN
            </a>
            <div className="modal" id="loginModal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Login</h5>
                    <button className="close" data-dismiss="modal">
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={this.onSubmit} id="form1">
                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                          type="text"
                          placeholder="Username"
                          className="form-control"
                          onChange={this.onUsernameChange.bind(this)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          placeholder="Password"
                          className="form-control"
                          onChange={this.onPasswordChange.bind(this)}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-lg btn-orange"
                      type="submit"
                      form="form1"
                      value="Submit"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <button className="btn btn-orange btn-rounded" data-toggle="modal">
              SIGN UP
            </button>
          </li>
        </ul>
      </div>
    );
  }
};

export default LoginAndSignUp;
