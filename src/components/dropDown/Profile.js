import React, { Component } from "react";
import CowBg from "../CowBg";
import axios from "axios";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.username,
      firstName: "",
      lastName: "",
      nickname: "",
      displayName: "",
      address: "",
      phoneNumber: "",
      email: "",
      contact: "",
      isEdit: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    return axios({
      method: "GET",
      url: "http://localhost:8000/api/user?username=" + this.state.username,
      crossDomain: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(resp => {
      const obj = resp.data;
      this.setState({
        firstName: obj.firstName,
        lastName: obj.lastName,
        nickname: obj.nickname,
        displayName: obj.displayName,
        address: obj.address,
        phoneNumber: obj.phoneNumber,
        email: obj.email,
        contact: obj.contact
      });
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const isEdit = this.state.isEdit;
    this.setState({ isEdit: !isEdit });
  }

  handleInputChange = e => {
    if (this.state.isEdit) {
      const target = e.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }
  };

  render() {
    const {
      username,
      firstName,
      lastName,
      nickname,
      displayName,
      address,
      phoneNumber,
      email,
      contact
    } = this.state;
    return (
      <div>
        <br />
        <hr />
        <div className="container">
          <h1 className="display-4">
            <b>Profile</b>{" "}
          </h1>
        </div>
        <hr />
        <div className="container edge">
          <form onSubmit={this.onSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
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
                    value={firstName}
                  />
                  {this.state.isEdit ? (
                    <b style={{ color: "red" }}>Allowed to edit!</b>
                  ) : null}
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
                    value={lastName}
                  />
                  {this.state.isEdit ? (
                    <b style={{ color: "red" }}>Allowed to edit!</b>
                  ) : null}
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
                    value={nickname}
                  />
                  {this.state.isEdit ? (
                    <b style={{ color: "red" }}>Allowed to edit!</b>
                  ) : null}
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
                    value={address}
                  />
                  {this.state.isEdit ? (
                    <b style={{ color: "red" }}>Allowed to edit!</b>
                  ) : null}
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
                    value={phoneNumber}
                  />
                  {this.state.isEdit ? (
                    <b style={{ color: "red" }}>Allowed to edit!</b>
                  ) : null}
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
                    value={email}
                  />
                  {this.state.isEdit ? (
                    <b style={{ color: "red" }}>Allowed to edit!</b>
                  ) : null}
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
                    value={contact}
                  />
                  {this.state.isEdit ? (
                    <b style={{ color: "red" }}>Allowed to edit!</b>
                  ) : null}
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
                    pattern="[A-Za-z0-9]*"
                    title="Must contain only english alphabet and number"
                    value={displayName}
                  />
                  {this.state.isEdit ? (
                    <b style={{ color: "red" }}>Allowed to edit!</b>
                  ) : null}
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
                    value={username}
                  />
                  {this.state.isEdit ? (
                    <b style={{ color: "red" }}>Allowed to edit!</b>
                  ) : null}
                </div>

                <div className="form-group col-md-12 text-right">
                  {!this.state.isEdit ? (
                    <button type="submit" class="btn btn-outline-danger">
                      Edit
                    </button>
                  ) : null}
                  {this.state.isEdit ? (
                    <button type="submit" class="btn btn-outline-warning">
                      Sumbit
                    </button>
                  ) : null}
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

{
  /* <form onSubmit={this.onSubmit.bind(this)}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form> */
}
