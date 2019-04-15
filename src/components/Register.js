import React, { Component } from "react";
import CowBg from "./CowBg";
import axios from "axios";
import querystring from "query-string";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      nickname: "",
      displayName: "",
      address: "",
      phoneNumber: "",
      email: "",
      contact: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  onSubmit = async e => {
    e.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      nickname: this.state.nickname,
      displayName: this.state.displayName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      contact: this.state.contact
    };

    const response = await axios({
      method: "POST",
      url: "http://localhost:8000/api/register",
      crossDomain: true,
      data: querystring.stringify(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    // console.log(data);
  };
  render() {
    return (
      <div>
        <br />
        <hr />
        <div className="container">
          <h1 className="display-4">
            <b>Register</b>
          </h1>
        </div>
        <hr />
        <div className="container edge">
          <form onSubmit={this.onSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <div className="form-group col-md-12">
                  <h1> Profile </h1>
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="first name"
                    onChange={this.handleInputChange}
                    name="firstName"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="last name"
                    onChange={this.handleInputChange}
                    name="lastName"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="nickname">Nickname</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nickname"
                    placeholder="nickname"
                    onChange={this.handleInputChange}
                    name="nickname"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="address">Address</label>
                  <textarea
                    className="form-control"
                    id="address"
                    placeholder="address"
                    onChange={this.handleInputChange}
                    name="address"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="phone number">Phone number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone number"
                    placeholder="phone number"
                    onChange={this.handleInputChange}
                    name="phoneNumber"
                  />
                </div>
              </div>
              <div className="form-group col-md-6">
                <div className="form-group col-md-12">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="email"
                    onChange={this.handleInputChange}
                    name="email"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="contact">Contact</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contact"
                    placeholder="contact"
                    onChange={this.handleInputChange}
                    name="contact"
                  />
                </div>
                <br />
                <div className="form-group col-md-12">
                  <h1>
                    <span className="text-orange text-extra">Account</span>
                  </h1>
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="diaplay name">Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="diaplay name"
                    placeholder="diaplay name"
                    onChange={this.handleInputChange}
                    name="displayName"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="username"
                    onChange={this.handleInputChange}
                    name="username"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="password"
                    onChange={this.handleInputChange}
                    name="password"
                  />
                </div>
                <div className="form-group col-md-12 text-right">
                  <button type="submit" class="btn btn-outline-warning">
                    Sumbit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <CowBg />
      </div>
    );
  }
}
