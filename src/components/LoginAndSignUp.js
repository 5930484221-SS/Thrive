import React, { Component } from "react";

export default props => {
  return (
    <div>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-3">
            <a className="nav-link" href="#">
              LOGIN
            </a>
          </li>
          <li>
            <button id="nav-signup" className="btn btn-orange btn-rounded">
              SIGN UP
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
