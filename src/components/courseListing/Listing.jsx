import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';

import CowBg from '../CowBg';
import CourseContainer from './CourseContainer';
import SearchBar from './SearchBar';

import Loader from '../loader/Loader';

import { subjects, locations, tuitionFees, ratings } from './filterLists';

class Listing extends Component {
  constructor() {
    super();
    this.state = {
      courseList: [],
      isLoading: true,
      search: null,
      subject: null,
      location: null,
      tuitionFee: null,
      rating: null,
      isFilterOn: false
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

  async onSearchChange(e) {
    this.setState({
      search: e.target.value
    });
    // set courseList to the filtered results
    // you can use subject, location, tuitionFee, and rating state to do the queries
  }

  async onSearch(e) {
    e.preventDefault();
    // set courseList to the searched results
    // you can use search state to do the queries
  }

  handleChange(index, selectedOption) {
    switch (index) {
      case 0:
        this.setState({
          subject: selectedOption
        });
        break;
      case 1:
        this.setState({
          location: selectedOption
        });
        break;
      case 2:
        this.setState({
          tuitionFee: selectedOption
        });
        break;
      case 3:
        this.setState({
          rating: selectedOption
        });
        break;
    }
  }

  render() {
    const {
      isLoading,
      search,
      subject,
      location,
      tuitionFee,
      rating,
      isFilterOn
    } = this.state;
    // take a look at the states in the console!
    console.log({ search, subject, location, tuitionFee, rating });

    return (
      <div>
        {isLoading ? Loader : null}
        {/* <img src={section1} id="section1" /> */}
        <CowBg />
        <div className="py-4">
          <SearchBar
            onChange={this.onSearchChange.bind(this)}
            onSearch={this.onSearch.bind(this)}
            searchValue={search}
          />
          <div>
            {isFilterOn ? (
              <div className="card bg-transparent mt-3">
                <div className="card-body">
                  <div className="card-title text-center">
                    <a
                      onClick={() =>
                        this.setState({
                          isFilterOn: false,
                          subject: null,
                          location: null,
                          tuitionFee: null,
                          rating: null
                        })
                      }
                      href="#"
                      className="h5 card-title text-center"
                    >
                      Filters <i className="fas fa-angle-up" />{' '}
                    </a>
                  </div>

                  <div className="row my-3">
                    <div className="col-lg-2">Subject</div>

                    <div className="col-lg-10">
                      <Select
                        value={subject}
                        onChange={this.handleChange.bind(this, 0)}
                        options={subjects}
                        isMulti={true}
                        placeholder="Subject"
                        name="subject"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-2">Location</div>

                    <div className="col-lg-10">
                      <Select
                        value={location}
                        onChange={this.handleChange.bind(this, 1)}
                        options={locations}
                        isMulti={true}
                        placeholder="Location"
                        name="location"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-2">Tuition Fee</div>

                    <div className="col-lg-10">
                      <Select
                        value={tuitionFee}
                        onChange={this.handleChange.bind(this, 2)}
                        options={tuitionFees}
                        placeholder="Tuition Fee"
                        name="tuitionFee"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-2">Rating</div>

                    <div className="col-lg-10">
                      <Select
                        value={rating}
                        onChange={this.handleChange.bind(this, 3)}
                        options={ratings}
                        placeholder="Rating"
                        name="rating"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card bg-transparent mt-3">
                <div className="card-body text-center">
                  <a
                    href="#"
                    className="card-title text-center h5"
                    onClick={() =>
                      this.setState({
                        isFilterOn: true
                      })
                    }
                  >
                    Filters <i className="fas fa-angle-down" />
                  </a>
                </div>
              </div>
            )}
          </div>
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
