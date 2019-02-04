import axios from "axios";
import querystring from "query-string";
import React, { Component } from "react";
import './courseCreate.css'
import '../App.css'
import cowLeft  from "../img/left1.svg";
import cowRight  from "../img/right1.svg";

class CourseCreation extends Component {
  course_name = React.createRef();
  state = {};

  onSubmit = async e => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:8000/api/create_course",
      crossDomain: true,
      data: querystring.stringify({
        token: localStorage.getItem("token"),
        course_name: this.course_name.current.value
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => alert("ok"))
      .catch(error => alert("failed"));
  };

  render() {
    return (
      <div>
      <form onSubmit={this.onSubmit}>
      <div class="form-row">
        <div class="form-group col-md-6">
            <div class="form-group col-md-11">
                <button type="button" class="btn btn-outline-dark uploadPic">Upload Image</button>
            </div>
            <div class="form-group col-md-11"> 
                <label for="descriptionProfile" class="Topic">Profile</label>
                <textarea class="form-control" id="descriptionProfile" rows="15" placeholder="Describe your profile"></textarea>
            </div>
            
        </div>
        <div class="form-group col-md-6">
        <div class="form-group">
          <label for="topic" class="Topic">Topic</label>
          <input type="text" class="form-control" id="topic" placeholder="Enter topic here" />
        </div>
        <br />

        <span class="Topic "> <span class="text-orange" style={{fontSize:"40px"}}>A</span>bout <span class="text-orange" style={{fontSize:"35px"}}>Course</span> </span>
        <div class="form-group">
          <label for="subject">Subject</label>
            <select class="form-control" id="subject">
              <option></option>
              <option>Mathematics</option>
              <option>Science</option>
              <option>Physics</option>
              <option>Chemical</option>
              <option>Biology</option>
              <option>Astronomy</option>
              <option>Basic Science</option>
              <option>Thai</option>
              <option>Social</option>
              <option>GAT-Thai</option>
              <option>GAT-Eng</option>
              <option>English</option>
              <option>France</option>
              <option>China</option>
              <option>Japanese</option>
              <option>Korea</option>
              <option>Pat1</option>
              <option>Pat2</option>
              <option>Pat3</option>
              <option>CU-TEP</option>
              <option>TU GET</option>
            </select>
          <label for="description">Description</label>
          <textarea class="form-control" id="description" rows="3" placeholder="Describe your course"></textarea>

          <label for="location">Location</label>
          <textarea class="form-control" id="location" rows="3" placeholder="ex: Sukhumvit Line, Siam"></textarea>

          <label for="duration">Duration</label>
          <textarea class="form-control" id="duration" rows="3" placeholder="Date and Time"></textarea>
        </div>
        <br />

        <span class="Topic"> Charge </span>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="tuition">Tuition/Hour</label>
            <input type="number" class="form-control" id="tuition" step="10" />
          </div>
          <div class="form-group col-md-6">
          <label for="fee">Joining fee</label>
          <input type="number" class="form-control" id="fee" step="10" />
          </div>
        </div>
    </div>
      <div class="form-group col-md-12 ">
          <button class="btn btn-warning btn-lg btn-block" type="submit">Create Course</button>
      </div>

        <br />
        <input type="text" ref={this.course_name} />
        <input type="submit" value="Submit" />
        </div>
        
      </form>
      <div>
        <img src={cowLeft} alt="" id="left1" />
        <img src={cowRight} alt="" id="right1" />
      </div>
    </div>
    );
  }
}

export default CourseCreation;
