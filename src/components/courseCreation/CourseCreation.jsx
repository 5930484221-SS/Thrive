import axios from "axios";
import querystring from "query-string";
import React, { Component } from "react";
import CowBg from "../CowBg";
import { Courses } from "./Courses";
import Loader from "../loader/Loader";
import defaultCourse from "../../img/defaultCourse.png";
import "./courseCreate.css";

//redux
import { EditCourseAction } from "../../actions/EditCourseAction";
import { connect } from "react-redux";
const mapStateToProps = state => ({ editedInfo: state.editCourse.course });
const mapDispatchToProps = dispatch => ({
  setEditCourse: course => dispatch(EditCourseAction(course))
});

class CourseCreation extends Component {
  constructor() {
    super();
    this.state = {
      topic: "",
      description: "",
      descriptionProfile: "",
      subject: "",
      duration: "",
      location: "",
      tuition: "",
      fee: "",
      img: defaultCourse,
      isLoading: false,
      isEditing: false,
      _id: ""
    };
  }

  componentDidMount() {
    const editedInfo = this.props.editedInfo;
    if (Object.keys(editedInfo).length !== 0) {
      this.setState({ ...editedInfo, isEditing: true });
    }
  }

  componentWillUnmount() {
    if (this.props.editedInfo !== {}) {
      this.props.setEditCourse({});
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (
      (name === "fee" || name === "tuition") &&
      (isNaN(value) || value.includes("-"))
    )
      return;
    this.setState({
      [name]: value
    });
  };

  setImg(img) {
    let reader = new FileReader();
    reader.onload = function(ev) {
      this.setState({ img: ev.target.result });
    }.bind(this);
    reader.readAsDataURL(img);
  }

  onFileHandle = event => {
    if (event.target.files.length > 0) {
      this.setImg(event.target.files[0]);
    }
  };

  getData() {
    const { isLoading, isEditing, _id, ...postData } = this.state;
    if (isEditing) {
      return { ...postData, token: localStorage.getItem("token"), id: _id };
    }
    return { ...postData, token: localStorage.getItem("token") };
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const postData = this.getData();
    const url = this.state.isEditing
      ? "http://localhost:8000/api/edit_course"
      : "http://localhost:8000/api/create_course";
    try {
      const response = await axios({
        method: "POST",
        url: url,
        crossDomain: true,
        data: querystring.stringify(postData),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      window.location = "/myCourses";
    } catch (error) {
      alert("Failed to submit, please try again\n" + error);
      console.log(error);
    }
    this.setState({ isLoading: false });
  };

  render() {
    console.log(this.state);
    const {
      topic,
      description,
      descriptionProfile,
      subject,
      duration,
      location,
      tuition,
      fee,
      img,
      isLoading,
      isEditing
    } = this.state;
    return (
      <div>
        <CowBg />
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <div className="form-group col-md-11 text-center">
                <img
                  id="img-profile"
                  className="img-fluid px-5 py-3"
                  src={img}
                />
                <input
                  className="form-control-file"
                  type="file"
                  onChange={this.onFileHandle}
                  ref={this.imgRef}
                  accept="image/*"
                />
              </div>
              <div className="form-group col-md-11">
                <label htmlFor="descriptionProfile" className="topic">
                  Profile
                </label>
                <textarea
                  className="form-control"
                  id="descriptionProfile"
                  name="descriptionProfile"
                  rows="15"
                  placeholder="Describe your profile"
                  onChange={this.handleInputChange}
                  value={descriptionProfile}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="form-group">
                <label htmlFor="topic" className="topic">
                  Topic
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="topic"
                  name="topic"
                  placeholder="Enter topic here"
                  onChange={this.handleInputChange}
                  value={topic}
                  disabled={isLoading}
                  required
                />
              </div>

              <br />

              <span className="topic">
                {" "}
                <span className="text-orange text-extra">A</span>
                bout <span className="text-orange text-slim">Course</span>{" "}
              </span>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  className="form-control"
                  id="subject"
                  name="subject"
                  onChange={this.handleInputChange}
                  value={subject}
                  disabled={isLoading}
                  required
                >
                  <option value="selected" disabled hidden>
                    Select the course subject
                  </option>
                  {Courses.map(course => (
                    <option key={course}>{course}</option>
                  ))}
                </select>

                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  placeholder="Describe your course"
                  onChange={this.handleInputChange}
                  value={description}
                  disabled={isLoading}
                  required
                />

                <label htmlFor="location">Location</label>
                <textarea
                  className="form-control"
                  id="location"
                  name="location"
                  rows="3"
                  placeholder="ex: Sukhumvit Line, Siam"
                  onChange={this.handleInputChange}
                  value={location}
                  disabled={isLoading}
                  required
                />

                <label htmlFor="duration">Duration</label>
                <textarea
                  className="form-control"
                  id="duration"
                  name="duration"
                  rows="3"
                  placeholder="Date and Time"
                  onChange={this.handleInputChange}
                  value={duration}
                  disabled={isLoading}
                  required
                />
              </div>

              <br />

              <span className="topic"> Charge </span>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="tuition">Tuition/Hour</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tuition"
                    name="tuition"
                    size="6"
                    onChange={this.handleInputChange}
                    value={tuition}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="fee">Joining fee</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fee"
                    name="fee"
                    size="6"
                    onChange={this.handleInputChange}
                    value={fee}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
            </div>

            <input
              className="btn btn-warning btn-lg btn-block"
              type="submit"
              value={isEditing ? "Edit Course" : "Create Course"}
              disabled={isLoading}
            />
          </div>
        </form>
        {isLoading ? Loader : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseCreation);
