import React, { Component } from 'react';
import axios from 'axios';

import CowBg from '../CowBg';
import CourseContainer from './CourseContainer';
import SearchBar from './SearchBar';
import Filter from './Filter';

import Loader from '../loader/Loader';

class Listing extends Component {
  constructor() {
    super();
    this.state = {
      courseList: [],
      isLoading: true,
      search: ''
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

  onSearchChange(e) {
    this.setState({
      search: e.target.value
    });
  }

  render() {
    const { isLoading, search } = this.state;

    return (
      <div>
        {isLoading ? Loader : null}
        <CowBg />
        <div className="my-5">
          <SearchBar
            onChange={this.onSearchChange.bind(this)}
            searchValue={search}
          />
          <Filter />
        </div>

        <div className="row">
          <div className="card-deck">
            {this.state.courseList.map((c, index) => (
              <CourseContainer key={index} info={c} index={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Listing;
