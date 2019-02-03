import axios from "axios";
import querystring from "query-string";
import React, { Component } from "react";

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
      <form onSubmit={this.onSubmit}>
        <input type="text" ref={this.course_name} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default CourseCreation;
