import axios from "axios";
import querystring from "query-string";
import React, { Component } from "react";
import CowBg from "./CowBg";
import { Courses } from "./Courses";
import Loader from "./Loader";

import "./courseCreate.css";

class CourseCreation extends Component {
  course_name = React.createRef();

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
      isLoading: false
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name === "fee" || name === "tuition") {
      if (isNaN(value) || value.includes("-")) return;
    }
    this.setState({
      [name]: value
    });
  };

  onSubmit = async e => {
    this.setState({ isLoading: true });
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:8000/api/create_course",
        crossDomain: true,
        data: querystring.stringify({
          token: localStorage.getItem("token"),
          course_name: this.state.topic
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      alert("ok");
    } catch (error) {
      alert("failed");
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
      isLoading
    } = this.state;
    return (
      <div>
        <CowBg />
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <div className="form-group col-md-11">
                <button
                  type="button"
                  className="btn btn-outline-dark uploadPic"
                >
                  <input type="file" onChange={this.handleInputChange} />
                </button>
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
                  disabled = {isLoading}
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
                  disabled = {isLoading}
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
                  disabled = {isLoading}
                >
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
                  disabled = {isLoading}
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
                  disabled = {isLoading}
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
                  disabled = {isLoading}
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
                    step="10"
                    onChange={this.handleInputChange}
                    value={tuition}
                    disabled = {isLoading}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="fee">Joining fee</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fee"
                    name="fee"
                    step="10"
                    onChange={this.handleInputChange}
                    value={fee}
                    disabled = {isLoading}
                  />
                </div>
              </div>
            </div>

            <input
              className="btn btn-warning btn-lg btn-block"
              type="submit"
              value="Create Course"
            />

            <br />
          </div>
        </form>
        {isLoading? Loader:null}
      </div>
    );
  }
}

export default CourseCreation;
