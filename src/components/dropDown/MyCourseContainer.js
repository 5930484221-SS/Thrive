import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyCourseContainerTemplate from "./MyCourseContainerTemplate";
import MyCourseContentError from "./MyCourseContentError";
import Loader from "../loader/Loader";
import StarRatings from "react-star-ratings";
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
            <MyCourseContainerTemplate info={course} key={course._id}>
              <div>
                <button
                  className="btn btn-orange"
                  onClick={() => this.onEditCourse(course)}
                  style={{ marginBottom: "5px" }}
                >
                  <Link to="/create_course" style={{ color: "white" }}>
                    Edit
                  </Link>
                </button>
                <span> </span>
                <button
                  className="btn btn-secondary"
                  onClick={() => this.onDeleteCourse(course)}
                  style={{ marginBottom: "5px" }}
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
      isLoading: false,
      rating: 0,
      review: "",
      courseID: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setID = this.setID.bind(this);
  }

  setID(id) {
    this.setState({ courseID: id });
  }

  changeRating(newRating, name) {
    this.setState({
      rating: newRating
    });
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  onSubmit(e) {
    e.preventDefault();
    if (this.state.rating === 0) {
      return swal("Please rating");
    }
    const data = {
      token: localStorage.getItem("token"),
      review: this.state.review,
      rating: this.state.rating,
      courseID: this.state.courseID
    };
    console.log(data);
    // return axios({
    //   method: "POST",
    //   url: "http://localhost:8000/api/",
    //   crossDomain: true,
    //   data: querystring.stringify(data),
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   }
    // }).then(() => {
    //   this.setState({ isEdit: false });
    // });
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
                <button
                  type="button"
                  className="btn btn-success"
                  data-toggle="modal"
                  data-target="#review"
                  style={{ marginBottom: "5px" }}
                  onClick={() => this.setID(course._id)}
                >
                  Review
                </button>
                <div
                  className="modal"
                  id="review"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Review Course{"  "}
                          <span style={{ color: "orange", fontWeight: "bold" }}>
                            {course.topic}
                          </span>
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <form onSubmit={this.onSubmit}>
                        <div className="modal-body">
                          <textarea
                            className="form-control rounded-0"
                            id="review"
                            rows="10"
                            name="review"
                            onChange={this.handleInputChange}
                            placeholder="Write review detail here."
                            required
                          />
                          <br />
                          <h5
                            style={{
                              display: "inline-block",
                              marginRight: "20px"
                            }}
                          >
                            Rating
                          </h5>
                          <StarRatings
                            rating={this.state.rating}
                            starRatedColor="orange"
                            changeRating={this.changeRating}
                            numberOfStars={5}
                            name="rating"
                            starHoverColor="orange"
                          />
                        </div>

                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="submit" className="btn btn-warning">
                            Send
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </MyCourseContainerTemplate>
          ))}
        </MyCourseContentError>
        {isLoading ? Loader : null}
      </div>
    );
  }
}
