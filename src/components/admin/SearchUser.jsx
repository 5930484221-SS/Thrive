import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import querystring from 'query-string';

import CowBg from '../CowBg';
import UserContainer from './UserContainer';
import SearchBar from '../courseListing/SearchBar';

import Loader from '../loader/Loader';


class SearchUser extends Component {
  constructor() {
    super();
    this.state = {
      userList:[],
      isLoading: true,
      search: '',
    };
  }

  async componentDidMount() {
    try {
      const response = await axios({
        method: 'GET',
        crossDomain: true,
        url: 'http://localhost:8000/api/get_user',//require get_user (in db)
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
          // "Access-Control-Allow-Origin": "*"
        }
      });
      this.setState({ userList: response.data.user, isLoading: false });
    } catch (error) {
      console.log('fetch fails, please refresh the page');
    }
  }

  onSearchChange(e) { 
    this.setState({
      search: e.target.value
    });
  }

  render() {
    const {
      isLoading,
      search,
      userList
    } = this.state;
    // take a look at the states in the console!
    console.log({ isLoading,search,userList });

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
          />
      </div>
        <div className="row">
          {userList.length > 0 || isLoading ? (
            userList.map((c, index) => (
              <UserContainer key={index} info={c} index={index} />
            ))
          ) : (
            <div className="display-4 m-auto">
              No <span className="text-orange">Results</span>
            </div>
          )}
        </div>
        <UserContainer />
      </div>
    );
  }
}

export default SearchUser;

