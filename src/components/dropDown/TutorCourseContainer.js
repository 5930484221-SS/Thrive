import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../courseListing/CourseContainer.css";

export default class TutorCourseContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="courseCard">
        <div className="col-3">
          <img src="https://media.licdn.com/dms/image/C510BAQFKXnLDglG5qA/company-logo_200_200/0?e=2159024400&v=beta&t=QKdDCJSmbaDE2mkA5ndgR407zzyfU4QEZQ0Hd769vBI" />
        </div>
        <div className="col-5">
          <br />
          <br />
          <span className="text">
            <strong>Topic : </strong> อุฟฟุฟวยหว่วยว้อย
            เอนเยะทวยววยว้วยอุบวิมวุบวิม โอซ๊าส อิอิซ่า ห้าห้าบวก
          </span>
          <br />
          <span className="text">
            <strong>Subject : </strong>
          </span>
          <br />
          <span className="text">
            <strong>Instruction : </strong>
          </span>
          <br />
          <span className="text">
            <strong>Description : </strong>
          </span>
          <span className="text">
            <strong>Location : </strong>
          </span>
        </div>
        <div className="col-5">
          <br />
          <br />
          <span className="text">
            <strong>Duration : </strong>
          </span>
          <br />
          <strong>Tuition/Hour : </strong>
          <br />
          <strong>Joining fee : </strong>
          <br />
          <strong>Score : </strong>
          <br />
          <br />
          {this.props.isTutor ? (
            <div>
              <button className="btn btn-orange" onClick={this.onEditCourse}>
                <Link to="/create_course" style={{ color: "white" }}>
                  Edit
                </Link>
              </button>
              <span> </span>
              <button
                className="btn btn-secondary"
                onClick={this.onDeleteCourse}
              >
                Delete
              </button>
            </div>
          ) : (
            <div>
              {" "}
              <button className="btn btn-success">Review</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

{
}
