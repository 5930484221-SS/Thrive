import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';

import CowBg from '../CowBg';
import CourseContainer from './CourseContainer';
import SearchBar from './SearchBar';

import Loader from '../loader/Loader';

import { subjects, tuitionFees, joiningFees, ratings } from './filterLists';

class Listing extends Component {
  constructor() {
    super();
    this.state = {
      courseList: [],
      isLoading: true,
      search: '',
      subject: [],
      location: '',
      tuitionMax: '',
      feeMax: '',
      rating: '',
      isFilterOn: false
    };
  }

  async componentDidMount() {
    try {
      const response = await axios({
        method: 'GET',
        crossDomain: true,
        url: 'http://localhost:8000/api/get_courses',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
          // "Access-Control-Allow-Origin": "*"
        }
      });
      this.setState({ courseList: response.data.courses, isLoading: false });
    } catch (error) {
      console.log('fetch fails, please refresh the page');
    }
  }

  onSearchChange(e) {
    this.setState({
      search: e.target.value
    });
  }

  onChange(e) {
    this.setState({
      location: e.target.value
    });
  }

  genQueryString(name, arr) {
    let str = '';
    for (let i = 0; i < arr.length; i++) {
      str += `&${name}=${arr[i].value}`;
    }
    return str;
  }

  async onFilterSubmit(e) {
    e.preventDefault();
    const { subject, location, tuitionMax, feeMax, rating } = this.state;
    this.setState({
      courseList: [],
      isLoading: true
    });

    let queryString = '';

    if (subject) queryString += this.genQueryString('subject', subject);
    if (location) queryString += `&location=${location}`;
    if (tuitionMax) queryString += `&tuitionMax=${tuitionMax.value}`;
    if (feeMax) queryString += `&feeMax=${feeMax.value}`;
    if (rating) queryString += `&ratingMin=${rating.value}`;
    queryString = queryString.slice(1);

    console.log('queryString: ', queryString);
    try {
      const response = await axios({
        method: 'GET',
        crossDomain: true,
        url: `http://localhost:8000/api/get_courses?${queryString}`
      });
      this.setState({ courseList: response.data.courses, isLoading: false });
    } catch (error) {
      console.log('fail to search, please try again');
    }
  }

  async onSearch(e) {
    e.preventDefault();
    const { search } = this.state;

    this.setState({
      courseList: [],
      isLoading: true
    });
    try {
      const response = await axios({
        method: 'GET',
        url: `http://localhost:8000/api/get_courses?tutor=${search.trim()}`
      });
      console.log('courses fetched from search: ', response.data.courses);
      this.setState(
        { courseList: response.data.courses, isLoading: false },
        () => console.log('courseList: ', this.state.courseList)
      );
    } catch (error) {
      console.log('search fails, please try again');
    }
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
          tuitionMax: selectedOption
        });
        break;
      case 3:
        this.setState({
          rating: selectedOption
        });
        break;
      case 4:
        this.setState({
          feeMax: selectedOption
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
      tuitionMax,
      feeMax,
      rating,
      isFilterOn,
      courseList
    } = this.state;
    // take a look at the states in the console!
    console.log({ search, subject, location, tuitionMax, feeMax, rating });

    return (
      <div>
        {isLoading ? Loader : null}
        {/* <img src={section1} id="section1" /> */}
        <CowBg />
        <div className="py-4">
          <SearchBar
            placeHolder="Search Tutor"
            onChange={this.onSearchChange.bind(this)}
            onSearch={this.onSearch.bind(this)}
            searchValue={search}
          />
          <div>
            {isFilterOn && !isLoading ? (
              <div className="card bg-transparent mt-3">
                <div className="card-body">
                  <div className="card-title text-center">
                    <a
                      onClick={() =>
                        this.setState({
                          isFilterOn: false,
                          subject: null,
                          location: null,
                          tuitionMax: null,
                          feeMax: null,
                          rating: null
                        })
                      }
                      href="#"
                      className="h5 card-title text-center"
                    >
                      Filters <i className="fas fa-angle-up" />{' '}
                    </a>
                  </div>
                  <form onSubmit={this.onFilterSubmit.bind(this)}>
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
                        <input
                          type="text"
                          placeholder="Location"
                          className="form-control"
                          onChange={this.onChange.bind(this)}
                          value={location}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-2">Tuition/Hour</div>

                      <div className="col-lg-10">
                        <Select
                          value={tuitionMax}
                          onChange={this.handleChange.bind(this, 2)}
                          options={tuitionFees}
                          placeholder="Tuition"
                          name="tuitionMax"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-2">Joining Fee</div>

                      <div className="col-lg-10">
                        <Select
                          value={feeMax}
                          onChange={this.handleChange.bind(this, 4)}
                          options={joiningFees}
                          placeholder="Joining Fee"
                          name="feeMax"
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
                    <div classNfame="text-center">
                      <input
                        type="submit"
                        value="Search"
                        className="btn btn-outline-dark btn-lg"
                      />
                    </div>
                  </form>
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
          {console.log(courseList)}
          {courseList.length > 0 || isLoading ? (
            courseList.map((c, index) => {
              return c.status === 'closed' ? null : (
                <CourseContainer key={index} info={c} index={index} />
              );
            })
          ) : (
            <div className="display-4 m-auto">
              No <span className="text-orange">Results</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Listing;
