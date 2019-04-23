import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyCourseContainerTemplate from "./MyCourseContainerTemplate";
import MyCourseContentError from "./MyCourseContentError";
import Loader from "../loader/Loader";

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
    } catch (error) {
      console.log(error);
    }
  }

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
    const { isLoading, coursesAsTutor } = this.state;
    return (
      <div>
        {" "}
        <MyCourseContentError>
          {coursesAsTutor.map(course => (
            <MyCourseContainerTemplate info={course}>
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
