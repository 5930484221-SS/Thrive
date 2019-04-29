import axios from "axios";
import querystring from "query-string";
import React, { Component } from "react";
import ipAddress from "../configIpAddress"

import LandingText from "./LandingText";

import CowBg from "./CowBg";

class Login extends Component {
  state = {};

  username = React.createRef();
  password = React.createRef();

  onSubmit = async e => {
    e.preventDefault();
    const response = await axios({
      method: "POST",
      url: ipAddress + "/api/login",
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
    return (
      <div>
        <CowBg />
        <LandingText />
      </div>
    );
  }
}

export default Login;
