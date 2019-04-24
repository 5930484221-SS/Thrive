import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyCourseContainerTemplate from "./MyCourseContainerTemplate";
import MyCourseContentError from "./MyCourseContentError";
import Loader from "../loader/Loader";
import swal from "sweetalert";

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

//-------------------Tutor--------------------
class TeachingContainer extends Component {
  constructor() {
    super();
    this.state = {
      coursesAsTutor: [],
      isLoading: false
    };
  }

  async componentDidMount() {
    try {
      await this.setState({ isLoading: true });
      const response = await fetch(
        "http://127.0.0.1:8000/api/get_courses?tutor=" +
          window.localStorage.username
      );
      const courses = await response.json();
      this.setState({ coursesAsTutor: courses.courses, isLoading: false });
      console.log(courses.courses);
    } catch (error) {
      console.log(error);
    }
  }

  onCloseCourse = info => {
    swal({
      title: "Are you sure?",
      text: "Once closed, learner will not be able to request the course",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        axios({
          method: "POST",
          url: "http://127.0.0.1:8000/api/close_course",
          crossDomain: true,
          data: querystring.stringify({
            token: window.localStorage.token,
            id: info._id
          }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
          .then(() =>
            swal({
              text: "The course has been closed successfully",
              icon: "success"
            })
          )
          .then(() => (window.location = "/myCourses"))
          .catch(error => {
            swal({
              text: "Failed to Close the course\n" + error,
              icon: "error"
            });
          });
      }
    });
  };

  onDeleteCourse = info => {
    swal({
      title: "Are you sure?",
      text:
        "Once deleted, you will not be able to recover the course and the course request will be deleted",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
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
          .then(() =>
            swal({
              text: "The course has been deleted successfully",
              icon: "success"
            })
          )
          .then(() => (window.location = "/myCourses"))
          .catch(error => {
            swal({
              text: "Failed to Delete the course\n" + error,
              icon: "error"
            });
          });
      }
    });
  };

  onEditCourse = info => {
    this.props.setEditCourse(info);
  };

  renderComponent(course) {
    switch (course.status) {
      case "open":
        return (
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
        );
      case "reserved":
        return (
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
              onClick={() => this.onCloseCourse(course)}
            >
              Close
            </button>
          </div>
        );
      case "closed":
        console.log("wsfsdfhgjhk")
        return(<p>The course had been closed</p>)
      default:
        return null;
    }
  }

  render() {
    const { isLoading, coursesAsTutor } = this.state;
    return (
      <div>
        {" "}
        <MyCourseContentError>
          {coursesAsTutor.map(course => (
            <MyCourseContainerTemplate info={course} key={course._id}>
              {this.renderComponent(course)}
            </MyCourseContainerTemplate>
          ))}
        </MyCourseContentError>
        {isLoading ? Loader : null}
      </div>
    );
  }
}

export const TeachingCourseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeachingContainer);


//------------------Learner--------------------
export class LearningCourseContainer extends Component {
  constructor() {
    super();
    this.state = {
      coursesAsLearner: [],
      isLoading: false
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const response = await axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/get_courses_by_learner",
        crossDomain: true,
        data: querystring.stringify({
          token: window.localStorage.token
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      this.setState({
        coursesAsLearner: response.data.courses,
        isLoading: false
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { isLoading, coursesAsLearner } = this.state;
    return (
      <div>
        <MyCourseContentError>
          {coursesAsLearner.map(course => (
            <MyCourseContainerTemplate info={course} key={course._id}>
              <div>
                {" "}
                <button className="btn btn-success">Review</button>
              </div>
            </MyCourseContainerTemplate>
          ))}
        </MyCourseContentError>
        {isLoading ? Loader : null}
      </div>
    );
  }
}
