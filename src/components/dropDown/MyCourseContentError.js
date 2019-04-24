import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class MyCourseContentError extends Component {
  constructor() {
    super();
  }
  render() {
    if (this.props.children.length === 0) {
      return (
        <div className="text-center">
          You don't have course or request. Check it out in {" "}
          <Link to="/listing" style={{ color: "orange" ,fontWeight:"bold"}}>
            Courses
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}
