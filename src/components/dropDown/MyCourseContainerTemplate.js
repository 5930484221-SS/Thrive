import React, { Component } from "react";
import "../courseListing/CourseContainer.css";

export default class TutorCourseContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log("info: ");
    console.log(this.props.info);
  }

  render() {
    const {
      topic,
      description,
      descriptionProfile,
      subject,
      duration,
      location,
      tuition,
      tutor_display,
      fee,
      img,
      rating,
      status
    } = this.props.info;
    return (
      <div
        className="courseCard container"
        style={{ opacity: status === "closed" ? "0.5" : "1" }}
      >
        <div className="col-3">
          <img
            className="card-img-top img-fluid"
            src={img}
            alt="unable to load picture"
            style={{ marginTop: "10%", marginBottom: "10%" }}
          />
        </div>

        <div className="col-5">
          <br />
          <br />
          <span className="text">
            <strong>Topic : </strong> {topic}
          </span>
          <br />
          <span className="text">
            <strong>Subject : </strong>
            {subject}
          </span>
          <br />
          <span className="text">
            <strong>Instruction : </strong>
            {tutor_display}
          </span>
          <br />
          <span className="text">
            <strong>Description : </strong>
            {description}
          </span>
          <span className="text">
            <strong>Location : </strong>
            {location}
          </span>
        </div>

        <div className="col-5">
          <br />
          <br />
          <span className="text">
            <strong>Duration : </strong>
            {duration}
          </span>
          <br />
          <strong>Tuition/Hour : </strong>฿{tuition}
          <br />
          <strong>Joining fee : </strong>฿{fee}
          <br />
          <strong>Score : </strong>
          {rating}
          <br />
          <br />
          {this.props.children}
        </div>
      </div>
    );
  }
}
