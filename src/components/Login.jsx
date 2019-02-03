import axios from "axios";
import querystring from "query-string";
import React, { Component } from "react";

class Login extends Component {
  state = {};

  username = React.createRef();
  password = React.createRef();

  onSubmit = async e => {
    e.preventDefault();
    const response = await axios({
      method: "POST",
      url: "http://localhost:8000/api/login",
      crossDomain: true,
      data: querystring.stringify({
        username: this.username.current.value,
        password: this.password.current.value
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    localStorage.setItem("token", response.data.token);
    alert("ok");
    window.location = "/";
  };

  render() {
    if (localStorage.getItem("token") === null)
      return (
        <form onSubmit={this.onSubmit}>
          <input type="text" ref={this.username} />
          <input type="text" ref={this.password} />
          <input type="submit" value="login" />
        </form>
      );
    return <h1>you have logged in</h1>;
  }
}

export default Login;
