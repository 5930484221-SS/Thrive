import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Listing from './components/courseListing/Listing';
import CourseCreation from './components/courseCreation/CourseCreation';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Profile from './components/dropDown/Profile';
import MyCourses from './components/dropDown/MyCourses';
import Setting from './components/dropDown/Setting';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

import "./App.css";
import { store } from "./configStore";
import * as Actions from "./actions";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {localStorage.getItem('token') === null ? (
              <NavBar auth={false} />
            ) : (
                <NavBar auth={true} />
              )}

            <div className="container">
              <Switch>
                <Route path="/listing" component={Listing} />
                <Route path="/create_course" component={CourseCreation} />
                <Route path="/profile" component={Profile} />
                <Route path="/myCourses" component={MyCourses} />
                <Route path="/setting" component={Setting} />
                <Route path="/" component={Login} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
