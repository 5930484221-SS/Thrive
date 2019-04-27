import React, { Component } from "react";
import "./CourseContainer.css";

import axios from "axios";
import querystring from "query-string";
import StarRatings from "react-star-ratings";

class RateReviewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewList: []
    };
  }

  async componentWillMount() {
    try {
      console.log("see more review");
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/api/get_reviews?course_id=" + this.props.id,
        crossDomain: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      this.setState({ reviewList: response.data["reviews"] });
      console.log(this.state.reviewList);
      // console.log(this.state.reviewList[0].rating);
    } catch {}
  }

  render() {
    return (
      <div>
        <div className="card disabled-hover">
          <h5 className="card-body pt-3 pb-3">
            Score: {"  "}
            <StarRatings
              rating={2}
              starDimension="30px"
              starSpacing="1px"
              starRatedColor="darkred"
            />
          </h5>
          <h5 className="card-body pt-3 pb-3">Review: </h5>
          <h5 className="card-footer pt-3 pb-3">Reviewed by:</h5>
        </div>
      </div>
    );
  }
}

export default RateReviewContainer;
