import React, { Component } from "react";
import CowBg from "../CowBg";
import "./myCourses.css";
import "../courseListing/CourseContainer.css";
import MyCoursesContainer from "./MyCoursesContainer";
import books from "../../img/books.svg";
import teacher from "../../img/teacher.svg";
import noti from "../../img/notification.svg";
import edu from "../../img/education.svg";
import Loader from "../loader/Loader";
import NoCourse from "./NoCourses";
import TutorCourseContainer from "./TutorCourseContainer";
import Noti from "./Noti";

export default class MyCourses extends Component {
  constructor() {
    super();
    this.state = {
      coursesAsTutor: [],
      coursesAsStudent: [],
      isLoading: false,
      isTutor: true,
      isLearner: null,
      isNotification: null,
      hasCourse: true
    };
    this.onTutorClick = this.onTutorClick.bind(this);
    this.onLearnerClick = this.onLearnerClick.bind(this);
    this.onNotification = this.onNotification.bind(this);
  }

  onTutorClick() {
    this.setState({
      isTutor: true,
      isLearner: false,
      isNotification: false
    });
    console.log(
      "tutor:" +
        this.state.isTutor +
        " learner: " +
        this.state.isLearner +
        " noti:" +
        this.state.isNotification
    );
  }

  onLearnerClick() {
    this.setState({
      isTutor: false,
      isLearner: true,
      isNotification: false
    });
    console.log(
      "tutor:" +
        this.state.isTutor +
        " learner: " +
        this.state.isLearner +
        " noti:" +
        this.state.isNotification
    );
  }

  onNotification() {
    this.setState({
      isTutor: false,
      isLearner: false,
      isNotification: true
    });
    console.log(
      "tutor:" +
        this.state.isTutor +
        " learner: " +
        this.state.isLearner +
        " noti:" +
        this.state.isNotification
    );
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.fetchTutorCourses();
    // this.fetchStudentCourses();
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

  async fetchStudentCourses() {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { coursesAsTutor, isLoading } = this.state;
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
        <div className="container mycoursePage">
          <div className="row text-center">
            <div className="col border-right">
              <a className="display-4 topic btn" onClick={this.onTutorClick}>
                {this.state.isTutor ? (
                  <span className="underline-on-hover">As a tutor</span>
                ) : (
                  <span>As a tutor</span>
                )}
              </a>
              <img src={edu} style={{ width: "40px", height: "auto" }} />
            </div>
            <div className="col border-right">
              <a className="display-4 topic btn" onClick={this.onLearnerClick}>
                {this.state.isLearner ? (
                  <span className="underline-on-hover">As a learner</span>
                ) : (
                  <span>As a learner</span>
                )}
              </a>
              <img src={books} style={{ width: "40px", height: "auto" }} />
            </div>
            <div className="col">
              <a className="display-4 topic btn" onClick={this.onNotification}>
                {this.state.isNotification ? (
                  <span className="underline-on-hover">Request/Response</span>
                ) : (
                  <span>Request/Response</span>
                )}
              </a>
              {/* <img src={noti} style={{ width: "40px", height: "auto" }} /> */}
            </div>
          </div>
          <hr />
          <div className="container">
            {this.state.isTutor ? (
              this.state.hasCourse ? (
                <TutorCourseContainer isTutor={this.state.isTutor} />
              ) : (
                <NoCourse />
              )
            ) : null}
            {this.state.isLearner ? (
              this.state.hasCourse ? (
                <TutorCourseContainer isTutor={this.state.isTutor} />
              ) : (
                <NoCourse />
              )
            ) : null}
            {this.state.isNotification ? <Noti /> : null}
          </div>
        </div>

        {/* old version */}
        {/* <div className="row">
          <div className="card-deck">
            {coursesAsTutor.map((course, index) => (
              <MyCoursesContainer key={index} info={course} index={index} />
            ))}
          </div>
        </div> */}
        {isLoading ? Loader : null}
      </div>
    );
  }
}
