import React, { Component } from "react";
import "./CourseContainer.css";

import axios from "axios";
import querystring from "query-string";
import StarRatings from "react-star-ratings";

class RateReviewContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rating = parseInt(this.props.item.rating);
    return (
      <div>
        <br />
        <div className="card disabled-hover">
          <h6 className="card-body pt-3 pb-3">
            Score: {"  "}
            <StarRatings
              rating={rating}
              starDimension="30px"
              starSpacing="1px"
              starRatedColor="darkred"
            />
          </h6>
          <h6 className="card-body pt-3 pb-3">
            Review: {this.props.item.review}
          </h6>
          <h6 className="card-footer pt-3 pb-3">
            Reviewed by: {this.props.item.display_name}
          </h6>
        </div>
      </div>
    );
  }
}

export default RateReviewContainer;
