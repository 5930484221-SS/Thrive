import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import querystring from 'query-string';
import CowBg from '../CowBg';
import UserContainer from './UserContainer';
import SearchBar from '../courseListing/SearchBar';
import Loader from '../loader/Loader';
import ipAddress from '../../configIpAddress';

class SearchUser extends Component {
  constructor() {
    super();
    this.state = {
      userList: [],
      isLoading: true,
      search: ''
    };
  }

  async refresh() {
    try {
      const response = await axios({
        method: 'GET',
        crossDomain: true,
        url: ipAddress + '/api/users?username', //require get_user (in db)
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
          // "Access-Control-Allow-Origin": "*"
        }
      });
      console.log('from componentDidMount', response);
      this.setState({ userList: response.data.users, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.refresh();
  }

  onSearchChange(e) {
    this.setState({
      search: e.target.value
    });
  }

  async onSearch(e) {
    e.preventDefault();

    this.setState({
      courseList: [],
      isLoading: true
    });
    try {
      const response = await axios.get(
        `${ipAddress}/api/users?username=${this.state.search.trim()}`
      );
      this.setState({ userList: response.data.users, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { isLoading, search, userList } = this.state;
    // take a look at the states in the console!
    let toDisplay;
    if (isLoading) toDisplay = <div />;
    else if (userList.length > 0) {
      toDisplay = userList.map((c, index) => (
        <li className="list-group-item" key={index}>
          <UserContainer
            info={c}
            index={index}
            refresh={this.refresh.bind(this)}
          />
        </li>
      ));
    } else {
      toDisplay = (
        <div className="display-4 m-auto">
          No <span className="text-orange">Results</span>
        </div>
      );
    }
    console.log({ isLoading, userList });

    return (
      <div>
        {isLoading ? Loader : null}
        {/* <img src={section1} id="section1" /> */}
        <CowBg />
        <div className="py-4">
          <SearchBar
            placeHolder="Search User"
            onChange={this.onSearchChange.bind(this)}
            searchValue={search}
            onSearch={this.onSearch.bind(this)}
          />
        </div>
        <div className="row">
          <div className="col-sm-2" />
          <div className="col-sm-8">
            <ul className="list-group">{toDisplay}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchUser;
