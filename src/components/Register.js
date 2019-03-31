import React, { Component } from "react";
import CowBg from "./CowBg";

export default class Register extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit() {}
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
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="last name"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="nickname">Nickname</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nickname"
                    placeholder="nickname"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="address">Address</label>
                  <textarea
                    className="form-control"
                    id="address"
                    placeholder="address"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="phone number">Phone number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone number"
                    placeholder="phone number"
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
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="contact">Contact</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contact"
                    placeholder="contact"
                  />
                </div>
                <br />
                <div className="form-group col-md-12">
                  <h1>
                    {" "}
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
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="username"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="password"
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
