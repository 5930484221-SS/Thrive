import React, { Component } from "react";
import axios from "axios";
import CowBg from "../CowBg";
import CourseContainer from "./CourseContainer";
import { Row } from "reactstrap";

class Listing extends Component {
  state = {
    courseList: []
  };

  async componentDidMount() {
    const response = await axios({
      method: "GET",
      crossDomain: true,
      url: "http://localhost:8000/api/get_courses",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        // "Access-Control-Allow-Origin": "*"
      }
    });
    // console.log(response.data.courses);
    this.setState({ courseList: response.data.courses });
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <CowBg />
        <div className="row m-4">
          {this.state.courseList.map(c => (
            <CourseContainer key={c.topic} info={c} />
          ))}
        </div>
      </div>
    );
  }
}

export default Listing;
