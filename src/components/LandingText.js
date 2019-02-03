import React, { Component } from "react";
import rocketWithShadow from "../img/rocket with shadow.svg";

export default props => {
  return (
    <div>
      <section id="showcase">
        <div class="container new-section">
          <div class="row">
            <div class="col-md-2" />
            <div class="col-lg-6 col-md-8">
              <div class="showcase-header">
                The{" "}
                <span class="text-orange">
                  <strong>BEST</strong>
                </span>{" "}
                Tutor & Learner Matching System
              </div>
              <p class="text-muted mt-3 showcase-text">
                Find your favorite tutor and study with your own pace wherever
                you want
              </p>
              <div id="big-button">
                <button class="btn btn-secondary btn-rounded btn-extra mt-4">
                  SIGN UP
                </button>
              </div>
            </div>
            <div class="col-md-2">
              <img
                class="img-fluid rocket-with-shadow d-none d-lg-block about-img"
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
