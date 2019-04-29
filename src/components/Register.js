import React, { Component } from "react";
import CowBg from "./CowBg";
import axios from "axios";
import querystring from "query-string";
import swal from "sweetalert";

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

    return axios({
      method: "POST",
      url: "http://localhost:8000/api/register",
      crossDomain: true,
      data: querystring.stringify(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(() => {
        swal(
          "Welcome to THRIVE. Your registration has been done successfully."
        );
        // alert(
        //   "Welcome to THRIVE. Your registration has been done successfully."
        // );
        return this.props.history.push("/");
      })
      .catch(ere => {
        swal("There are invalid data. Please try again.");
        // alert("There are invalid data. Please try again.");
      });
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
                    maxLength="30"
                    required
                    pattern="[A-Za-z]*"
                    title="Must contain only english alphabet"
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
                    maxLength="30"
                    required
                    pattern="[A-Za-z]*"
                    title="Must contain only english alphabet"
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
                    maxLength="10"
                    required
                    pattern="[A-Za-z]*"
                    title="Must contain only english alphabet"
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
                    maxLength="1024"
                    required
                    pattern="[A-Za-z0-9]*"
                    title="Must contain only english alphabet and number"
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
                    required
                    maxLength="10"
                    minLength="10"
                    pattern="[0-9]*"
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
                    required
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
                    required
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
                    maxLength="30"
                    required
                    pattern="[A-Za-z0-9 ]*"
                    title="Must contain only english alphabet and number"
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
                    maxLength="30"
                    minLength="4"
                    required
                    pattern="[A-Za-z0-9]*"
                    title="Must contain only english alphabet and number at least 4 and doesn't more than 30 characters"
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
                    maxLength="30"
                    minLength="6"
                    required
                    title="Must contain 6 or more character but not more than 30 character"
                  />
                </div>
                <div className="form-group col-md-12 text-right">
                  <button type="submit" class="btn btn-outline-warning">
                    Submit
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
