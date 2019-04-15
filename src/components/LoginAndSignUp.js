import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import querystring from "query-string";
import { loginUserSuccess } from "../actions";

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
    });
  }

  onPasswordChange(text) {
    this.setState({
      password: text.target.value
    });
  }

  onSubmit = async e => {
    e.preventDefault();
    const response = await axios({
      method: "POST",
      url: "http://localhost:8000/api/login",
      crossDomain: true,
      data: querystring.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", this.state.username);
    alert("ok");
    window.location = "/";
  };

  render() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            className="nav-link mx-3"
            href="#"
            data-toggle="modal"
            data-target="#loginModal"
          >
            LOGIN
          </a>
          <div className="modal fade" id="loginModal">
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
                  {/* Switch to admin login */}
                  <a
                    className="mr-auto"
                    href="#"
                    data-toggle="modal"
                    data-target="#loginAdminModal"
                    data-dismiss="modal"
                  >
                    Admin
                  </a>

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
          <div className="modal fade" id="loginAdminModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Login For Admin</h5>
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
                  <a
                    className="mr-auto"
                    href="#"
                    data-toggle="modal"
                    data-target="#loginModal"
                    data-dismiss="modal"
                  >
                    User
                  </a>
                  <button
                    className="btn btn-lg btn-success"
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
        <a href="/register">
          <button className="nav-item btn btn-orange btn-rounded">
            SIGN UP
          </button>
        </a>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { loginUserSuccess }
)(LoginAndSignUp);
