import React, { Component } from 'react';
import rocketWithShadow from '../img/rocket with shadow.svg';
import { Link } from 'react-router-dom';

export default props => {
  return (
    <div>
      <section id="showcase">
        <div className="container new-section">
          <div className="row">
            <div className="col-md-2" />
            <div className="col-lg-6 col-md-8">
              <h1 className="showcase-header">
                The{' '}
                <span className="text-orange">
                  <strong>BEST</strong>
                </span>{' '}
                Tutor & Learner Matching System
              </h1>
              <p className="text-muted mt-3 showcase-text">
                Find your favorite tutor and study with your own pace wherever
                you want
              </p>
              <div id="big-button">
                {localStorage.getItem('token') === null ? (
                  <a
                    href="/register"
                    className="btn btn-primary btn-rounded btn-extra mt-4"
                  >
                    SIGN UP
                  </a>
                ) : (
                  <a
                    href="/listing"
                    className="btn btn-danger btn-rounded btn-extra mt-4"
                  >
                    GET STARTED
                  </a>
                )}
              </div>
            </div>
            <div className="col-md-2">
              <img
                className="img-fluid rocket-with-shadow d-none d-lg-block about-img"
                src={rocketWithShadow}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
