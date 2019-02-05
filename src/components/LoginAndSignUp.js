import React, { Component } from 'react';

export default props => {
  return (
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
            <form onSubmit={props.onLogin}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-lg btn-orange"
              data-dismiss="modal"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
