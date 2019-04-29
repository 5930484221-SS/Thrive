import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div>
        {localStorage.getItem('token') === null ? (
          <div
            className="footer fixed-bottom"
            style={{ backgroundColor: '#fff0b3' }}
          >
            <br />
            <div className="copyR" style={{ color: 'black' }}>
              Copyright © 2019 | Made by THRIVE{' '}
            </div>
            <br />
          </div>
        ) : (
          <div className="footer fixed-bottom bg-dark">
            <br />
            <div className="copyR">Copyright © 2019 | Made by THRIVE </div>
            <br />
          </div>
        )}
      </div>
    );
  }
}
