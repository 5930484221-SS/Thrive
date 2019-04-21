import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyCourseContainer from "./MyCourseContainer";
import MyCourseContentError from "./MyCourseContentError";
import Noti from "./Noti";
import Loader from "../loader/Loader";

import CowBg from "../CowBg";
import "./myCourses.css";
import "../courseListing/CourseContainer.css";
import books from "../../img/books.svg";
import teacher from "../../img/teacher.svg";
import noti from "../../img/notification.svg";
import edu from "../../img/education.svg";

//query
import axios from "axios";
import querystring from "query-string";

//redux
import { EditCourseAction } from "../../actions/EditCourseAction";
import { connect } from "react-redux";
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  setEditCourse: course => dispatch(EditCourseAction(course))
});

const TUTOR = "TUTOR";
const LEARNER = "LEARNER";
const NOTIFICATION = "NOTIFICATION";

class MyCourses extends Component {
  constructor() {
    super();
    this.state = {
      coursesAsTutor: [],
      coursesAsLearner: [],
      isLoading: false,
      currentSubPage: TUTOR
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.fetchTutorCourses();
    this.fetchLearnerCourses();
  }

  async fetchTutorCourses() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/get_courses?tutor=" +
          window.localStorage.username
      );
      const courses = await response.json();
      this.setState({ coursesAsTutor: courses.courses, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  async fetchLearnerCourses() {
    try {
      const response = await fetch(
        // "get_courses_by_student"
        "http://127.0.0.1:8000/api/get_courses?tutor=" +
          window.localStorage.username
      );
      const courses = await response.json();
      this.setState({ coursesAsLearner: courses.courses, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  onSubNavClick = event => {
    this.setState({ currentSubPage: event.target.id });
  };

  onDeleteCourse = info => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/delete_course",
      crossDomain: true,
      data: querystring.stringify({
        token: window.localStorage.token,
        id: info._id
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(() => (window.location = "/myCourses"))
      .catch(error => {
        alert("Failed to Delete the course\n" + error);
        console.log(error);
      });
  };

  onEditCourse = info => {
    this.props.setEditCourse(info);
  };

  renderContent() {
    const currentSubPage = this.state.currentSubPage;
    if (currentSubPage === TUTOR) {
      return this.state.coursesAsTutor.map(course => {
        return (
          <MyCourseContainer info={course}>
            <div> 
              <button
                className="btn btn-orange"
                onClick={() => this.onEditCourse(course)}
              >
                <Link to="/create_course" style={{ color: "white" }}>
                  Edit
                </Link>
              </button>
              <span> </span>
              <button
                className="btn btn-secondary"
                onClick={() => this.onDeleteCourse(course)}
              >
                Delete
              </button>
            </div>
          </MyCourseContainer>
        );
      });
    } else if (currentSubPage === LEARNER) {
      return this.state.coursesAsLearner.map(course => (
        <MyCourseContainer info={course}>
          <div>
            {" "}
            <button className="btn btn-success">Review</button>
          </div>
        </MyCourseContainer>
      ));
    } else if (currentSubPage === NOTIFICATION) {
      return <Noti />;
    } else {
      return [];
    }
  }

  render() {
    const { isLoading, currentSubPage } = this.state;

    return (
      <div>
        <CowBg />
        <div className="topic">
          <h1 className="display-4">
            {" "}
            <b>My Courses </b>
          </h1>
          <hr />
        </div>

        {/* sub navbar */}
        <div className="container mycoursePage">
          <div className="row text-center">
            <div className="col border-right">
              <a className="display-4 topic btn">
                {currentSubPage === TUTOR ? (
                  <span className="underline-on-hover">As a tutor</span>
                ) : (
                  <span id={TUTOR} onClick={this.onSubNavClick}>
                    As a tutor
                  </span>
                )}
              </a>
              <img src={edu} style={{ width: "40px", height: "auto" }} />
            </div>
            <div className="col border-right">
              <a className="display-4 topic btn">
                {currentSubPage === LEARNER ? (
                  <span className="underline-on-hover">As a learner</span>
                ) : (
                  <span id={LEARNER} onClick={this.onSubNavClick}>
                    As a learner
                  </span>
                )}
              </a>
              <img src={books} style={{ width: "40px", height: "auto" }} />
            </div>
            <div className="col">
              <a className="display-4 topic btn">
                {currentSubPage === NOTIFICATION ? (
                  <span className="underline-on-hover">Request/Response</span>
                ) : (
                  <span id={NOTIFICATION} onClick={this.onSubNavClick}>
                    Request/Response
                  </span>
                )}
              </a>
              {/* <img src={noti} style={{ width: "40px", height: "auto" }} /> */}
            </div>
          </div>
          <hr />

          {/* Content */}
          <div className="container">
            <MyCourseContentError>{this.renderContent()}</MyCourseContentError>
          </div>
        </div>

        {isLoading ? Loader : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyCourses);
