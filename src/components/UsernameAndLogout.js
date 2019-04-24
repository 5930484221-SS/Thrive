import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import querystring from 'query-string';
import swal from 'sweetalert';

class UsernameAndLogout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onLogout = async e => {
    e.preventDefault();
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/logout',
      crossDomain: true,
      data: querystring.stringify({
        token: localStorage.getItem('token')
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    localStorage.removeItem('token');
    const success = await swal('logged out');
    // alert("logged out");
    window.location = '/';
  };

  render() {
    console.log(this.props);
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
          >
            <i className="fas fa-user ml-2" />{' '}
            {localStorage.getItem('displayName')}
          </a>
          <div className="dropdown-menu">
            <a href="/profile" className="dropdown-item">
              <i className="fas fa-user-circle" /> Profile
            </a>
            <a href="myCourses" className="dropdown-item">
              <i className="fas fa-clipboard-list" /> My Courses
            </a>
            <a href="setting" className="dropdown-item">
              <i className="fas fa-cog" /> Settings
            </a>
            <a href="#" onClick={this.onLogout} className="dropdown-item">
              <i className="fas fa-sign-out-alt" /> Logout
            </a>
          </div>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {}
)(UsernameAndLogout);
