import React, { Component } from "react";
import CowBg from "../CowBg";
import querystring from "query-string";
import axios from "axios";

export default class Profile extends Component {
  componentWillMount() {
    const data = {
      username: localStorage.userName
    };
    console.log(data);
    return axios({
      method: "GET",
      url: "http://localhost:8000/api/user",
      crossDomain: true,
      data: querystring.stringify(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(profile => {
      console.log(profile);
    });
  }

  render() {
    return (
      <div>
        dropDown >> Profile.js
        <CowBg />
      </div>
    );
  }
}
