import React, { Component } from 'react';
import axios from 'axios';
import CowBg from './CowBg';

class Listing extends Component {
  state = {
    courseList: []
  };

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
    console.log(response.data.courses);
    this.setState({ courseList: response.data.courses });
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <CowBg />
         {this.state.courseList.map(c => 
           Object.keys(c).map(key=>(<p>{key}: {c[key]}</p>))          
         )}
      </div>
    );
  }
}

export default Listing;
