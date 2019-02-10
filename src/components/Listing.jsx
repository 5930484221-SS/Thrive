import React, { Component } from "react";
import querystring from "query-string";
import axios from "axios";

class Listing extends Component {
  state = {
    course_list: []
  };

  async componentDidMount() {
    const response = await axios({
      method: "GET",
      crossDomain: true,
      url: "http://localhost:8000/api/get_courses",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        // "Access-Control-Allow-Origin": "*"
      }
    });
    console.log(response);
    this.setState({ course_list: response.data.courses });
  }
  render() {
    return (
      <div>
        {this.state.course_list.map(c => (
          <h7>
            {querystring.stringify(c)}
            <br />
          </h7>
        ))}
      </div>
    );
  }
}

export default Listing;
