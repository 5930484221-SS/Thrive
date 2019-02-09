import React, { Component } from 'react';
import axios from 'axios';

import CowBg from '../CowBg';
import CourseContainer from './CourseContainer';
import Loader from '../loader/Loader';

class Listing extends Component {
  constructor() {
    super();
    this.state = {
      courseList: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    const response = await axios({
      method: 'GET',
      crossDomain: true,
      url: 'http://localhost:8000/api/get_courses',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        // "Access-Control-Allow-Origin": "*"
      }
    });
    console.log('courses fetched: ', response.data.courses);
    this.setState({ courseList: response.data.courses, isLoading: false });
  }
  render() {
    const { isLoading } = this.state;

    return (
      <div>
        {isLoading ? Loader : null}
        <CowBg />
        <div className="row m-4">
          {this.state.courseList.map((c, index) => (
            <CourseContainer key={index} info={c} />
          ))}
        </div>
      </div>
    );
  }
}

export default Listing;
