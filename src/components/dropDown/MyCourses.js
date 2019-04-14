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
import { Link } from "react-router-dom";

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

const tutor = "tutor"
const learner = "learner"
const notification = "notification"

class MyCourses extends Component {
  constructor() {
    super();
    this.state = {
      coursesAsTutor: [],
      coursesAsLearner: [],
      isLoading: false,
      // isTutor: true,
      // isLearner: null,
      // isNotification: null,
      // hasCourse: true
      currentSubPage: tutor
    };
    // this.onTutorClick = this.onTutorClick.bind(this);
    // this.onLearnerClick = this.onLearnerClick.bind(this);
    // this.onNotification = this.onNotification.bind(this);
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

  // onTutorClick() {
  //   this.setState({
  //     isTutor: true,
  //     isLearner: false,
  //     isNotification: false
  //   });
  //   console.log(
  //     "tutor:" +
  //       this.state.isTutor +
  //       " learner: " +
  //       this.state.isLearner +
  //       " noti:" +
  //       this.state.isNotification
  //   );
  // }

  // onLearnerClick() {
  //   this.setState({
  //     isTutor: false,
  //     isLearner: true,
  //     isNotification: false
  //   });
  //   console.log(
  //     "tutor:" +
  //       this.state.isTutor +
  //       " learner: " +
  //       this.state.isLearner +
  //       " noti:" +
  //       this.state.isNotification
  //   );
  // }

  // onNotification() {
  //   this.setState({
  //     isTutor: false,
  //     isLearner: false,
  //     isNotification: true
  //   });
  //   console.log(
  //     "tutor:" +
  //       this.state.isTutor +
  //       " learner: " +
  //       this.state.isLearner +
  //       " noti:" +
  //       this.state.isNotification
  //   );
  // }
  onSubNavClick = event => {
    this.setState({ currentSubPage : event.target.id });
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

  render() {
    const { coursesAsTutor, coursesAsLearner, isLoading,currentSubPage } = this.state;
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
            <div className="col border-right" >
              <a className="display-4 topic btn" >
                {currentSubPage === tutor? (
                  <span className="underline-on-hover">As a tutor</span>
                ) : (
                  <span id={tutor} onClick={this.onSubNavClick}>As a tutor</span>
                )}
              </a>
              <img src={edu} style={{ width: "40px", height: "auto" }} />
            </div>
            <div className="col border-right" >
              <a className="display-4 topic btn" >
                {this.state.isLearner ? (
                  <span className="underline-on-hover" >As a learner</span>
                ) : (
                  <span id={learner} onClick={this.onSubNavClick}>As a learner</span>
                )}
              </a>
              <img src={books} style={{ width: "40px", height: "auto" }} />
            </div>
            <div className="col" >
              <a className="display-4 topic btn" >
                {this.state.isNotification ? (
                  <span className="underline-on-hover">Notification</span>
                ) : (
                  <span id={notification} onClick={this.onSubNavClick}>Notification</span>
                )}
              </a>
              <img src={noti} style={{ width: "40px", height: "auto" }} />
            </div>
          </div>
          <hr />

          <div className="container">
            {this.state.isTutor ? (
              this.state.hasCourse ? (
                coursesAsTutor.map(course => {
                  return (
                    <TutorCourseContainer info={course}>
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
                    </TutorCourseContainer>
                  );
                })
              ) : (
                <NoCourse />
              )
            ) : null}

            {this.state.isLearner ? (
              this.state.hasCourse ? (
                coursesAsLearner.map(course => (
                  <TutorCourseContainer info={course}>
                    <div>
                      {" "}
                      <button className="btn btn-success">Review</button>
                    </div>
                  </TutorCourseContainer>
                ))
              ) : (
                <NoCourse />
              )
            ) : null}

            {this.state.isNotification ? <div>noti</div> : null}
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
