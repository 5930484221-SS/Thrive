import React, { Component } from "react";

export default props => {
  return (
    <div>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-3">
            <div className="container">
              <button
                className="btn btn-rounded btn-light-orange"
                data-toggle="modal"
                data-target="#loginModal"
              >
                LOGIN
              </button>
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
                      <form>
                        <div className="form-group">
                          <label for="username">Username</label>
                          <input
                            type="text"
                            placeholder="Username"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label for="password">Password</label>
                          <input
                            type="password"
                            placeholder="Password"
                            className="form-control"
                          />
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn-primary" data-dismiss="modal">
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <button className="btn btn-orange btn-rounded " data-toggle="modal">
              SIGN UP
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};