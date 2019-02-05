import React, { Component } from 'react';
import homeIcon from '../img/homeicon.svg';

class Home extends Component {
  render() {
    return (
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item ml-1">
            <a href="#" class="nav-link">
              <img src={homeIcon} alt="home" class="home-icon mr-2" />
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
export default Home;
