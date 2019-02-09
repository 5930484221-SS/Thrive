import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoginAndSignUp from './LoginAndSignUp';
import rocketLogo from '../img/rocket_logo.svg';
import UsernameAndLogout from './UsernameAndLogout';

class NavBar extends Component {
  componentWillMount() {
    console.log(this.props.auth);
  }
  render() {
    return (
      <div>
        <nav
          className={
            this.props.auth
              ? 'navbar navbar-expand-sm navbar-dark bg-dark'
              : 'navbar navbar-expand-sm navbar-light navbar-light-orange'
          }
        >
          <div className="container">
            <a
              href="/"
              className={
                this.props.auth
                  ? 'navbar-brand text-white'
                  : 'navbar-brand text-secondary'
              }
            >
              <img src={rocketLogo} />
              THRIVE.
            </a>
            <button
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarNav"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div id="navbarNav" className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item ml-3">
                  <Link to="/listing" className="nav-link">
                    Courses
                  </Link>
                </li>
                {this.props.auth && (
                  <li className="nav-item ml-3">
                    <Link to="/create_course" className="nav-link">
                      Add Course
                    </Link>
                  </li>
                )}
              </ul>
              <ul className="navbar-nav ml-auto">
                {this.props.auth ? (
                  <li className="nav-item ml-3">
                    <UsernameAndLogout />
                  </li>
                ) : (
                    <li className="nav-item ml-3">
                      <LoginAndSignUp />
                    </li>
                  )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
